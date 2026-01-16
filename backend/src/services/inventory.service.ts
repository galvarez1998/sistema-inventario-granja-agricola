import { AppDataSource } from "../data-source";
import { Movement } from "../models/Movement";
import { Animal } from "../models/Animal";
import { ApiError } from "../utils/ApiError";

export class InventoryService {
  /**
   * Create a movement with transactional inventory updates
   */
  static async createMovementWithInventoryUpdate(movementData: {
    tipo: string;
    especie: string;
    cantidad: number;
    notas?: string;
    fecha?: Date;
  }) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const movementRepo = queryRunner.manager.getRepository(Movement);
      const animalRepo = queryRunner.manager.getRepository(Animal);

      // Create movement
      const movement = movementRepo.create(movementData as any);
      await queryRunner.manager.save(movement);

      // Update inventory based on movement type
      if (["venta", "muerte"].includes(movementData.tipo)) {
        // Reduce animals of that species
        const animals = await animalRepo.find({
          where: { especie: movementData.especie },
          order: { createdAt: "ASC" },
        });

        if (animals.length === 0) {
          throw ApiError.badRequest(`No animals found for species: ${movementData.especie}`);
        }

        let remainingToReduce = movementData.cantidad;
        for (const animal of animals) {
          if (remainingToReduce <= 0) break;

          const reduction = Math.min(animal.cantidad, remainingToReduce);
          animal.cantidad = animal.cantidad - reduction;
          remainingToReduce -= reduction;

          await queryRunner.manager.save(animal);
        }

        if (remainingToReduce > 0) {
          throw ApiError.badRequest(
            `Insufficient quantity for species ${movementData.especie}. Missing: ${remainingToReduce}`
          );
        }
      } else if (["nacimiento", "compra"].includes(movementData.tipo)) {
        // Add animals
        const existingAnimals = await animalRepo.find({
          where: { especie: movementData.especie },
          order: { createdAt: "DESC" },
          take: 1,
        });

        if (existingAnimals.length > 0) {
          const animal = existingAnimals[0];
          animal.cantidad = animal.cantidad + movementData.cantidad;
          await queryRunner.manager.save(animal);
        } else {
          const newAnimal = animalRepo.create({
            especie: movementData.especie,
            cantidad: movementData.cantidad,
            estado: "saludable",
          });
          await queryRunner.manager.save(newAnimal);
        }
      }

      await queryRunner.commitTransaction();
      return movement;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
