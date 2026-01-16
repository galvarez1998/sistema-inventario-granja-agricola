import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../models/Movement";
import { Animal } from "../models/Animal";
import { Product } from "../models/Product";

class MovementsController {
  static async create(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Movement);
      const movement = repo.create(req.body);
      await repo.save(movement);

      // Update inventory side-effects: example for venta/muerte/compra/nacimiento
      const animalRepo = AppDataSource.getRepository(Animal);
      if (["venta", "muerte"].includes(movement.tipo)) {
        // reduce animals of that species
        const animals = await animalRepo.findBy({ especie: movement.especie });
        // naive approach: reduce cantidad from first match
        if (animals.length > 0) {
          const a = animals[0];
          a.cantidad = Math.max(0, a.cantidad - movement.cantidad);
          await animalRepo.save(a);
        }
      } else if (movement.tipo === "nacimiento" || movement.tipo === "compra") {
        // add animals
        const animals = await animalRepo.findBy({ especie: movement.especie });
        if (animals.length > 0) {
          const a = animals[0];
          a.cantidad = a.cantidad + movement.cantidad;
          await animalRepo.save(a);
        } else {
          const newA = animalRepo.create({
            especie: movement.especie,
            cantidad: movement.cantidad,
            estado: "saludable"
          });
          await animalRepo.save(newA);
        }
      }

      res.status(201).json(movement);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Movement);
    const all = await repo.find({ order: { fecha: "DESC" } });
    res.json(all);
  }
}

export default MovementsController;