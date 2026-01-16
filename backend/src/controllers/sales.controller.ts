import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";
import { Animal } from "../models/Animal";

class SalesController {
  static async create(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Sale);
      const sale = repo.create(req.body);
      await repo.save(sale);

      // Deduct from inventory
      if (sale.tipo === "producto") {
        const prodRepo = AppDataSource.getRepository(Product);
        const p = await prodRepo.findOneBy({ id: sale.referenciaId });
        if (p) {
          // For eggs or meat, remove or decrement quantity logic as appropriate
          await prodRepo.delete(p.id);
        }
      } else if (sale.tipo === "animal") {
        const animalRepo = AppDataSource.getRepository(Animal);
        const a = await animalRepo.findOneBy({ id: sale.referenciaId });
        if (a) {
          a.cantidad = Math.max(0, a.cantidad - sale.cantidad);
          await animalRepo.save(a);
        }
      }

      res.status(201).json(sale);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Sale);
    const all = await repo.find({ order: { fecha: "DESC" } });
    res.json(all);
  }
}

export default SalesController;