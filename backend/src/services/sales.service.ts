import { AppDataSource } from "../data-source";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";
import { Animal } from "../models/Animal";
import { ApiError } from "../utils/ApiError";

export class SalesService {
  /**
   * Create a sale with transactional inventory updates
   */
  static async createSaleWithInventoryUpdate(saleData: {
    tipo: string;
    referenciaId: string;
    precioTotal: number;
    cantidad: number;
    notas?: string;
    fecha?: Date;
  }) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saleRepo = queryRunner.manager.getRepository(Sale);

      // Create sale
      const sale = saleRepo.create(saleData);
      await queryRunner.manager.save(sale);

      // Update inventory based on sale type
      if (saleData.tipo === "producto") {
        const prodRepo = queryRunner.manager.getRepository(Product);
        const product = await prodRepo.findOne({
          where: { id: saleData.referenciaId },
        });

        if (!product) {
          throw ApiError.notFound(`Product not found: ${saleData.referenciaId}`);
        }

        // For products with quantity tracking (eggs), decrement instead of delete
        if (product.tipo === "huevo" && product.cantidadHuevos) {
          if (product.cantidadHuevos < saleData.cantidad) {
            throw ApiError.badRequest(
              `Insufficient egg quantity. Available: ${product.cantidadHuevos}, Requested: ${saleData.cantidad}`
            );
          }
          product.cantidadHuevos -= saleData.cantidad;
          if (product.cantidadHuevos === 0) {
            await queryRunner.manager.remove(product);
          } else {
            await queryRunner.manager.save(product);
          }
        } else {
          // For meat and honey, remove the product entry
          await queryRunner.manager.remove(product);
        }
      } else if (saleData.tipo === "animal") {
        const animalRepo = queryRunner.manager.getRepository(Animal);
        const animal = await animalRepo.findOne({
          where: { id: saleData.referenciaId },
        });

        if (!animal) {
          throw ApiError.notFound(`Animal not found: ${saleData.referenciaId}`);
        }

        if (animal.cantidad < saleData.cantidad) {
          throw ApiError.badRequest(
            `Insufficient animal quantity. Available: ${animal.cantidad}, Requested: ${saleData.cantidad}`
          );
        }

        animal.cantidad = animal.cantidad - saleData.cantidad;
        await queryRunner.manager.save(animal);
      }

      await queryRunner.commitTransaction();
      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
