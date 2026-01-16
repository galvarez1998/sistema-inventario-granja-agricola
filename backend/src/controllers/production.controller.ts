import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Production } from "../models/Production";
import { Hive } from "../models/Hive";

class ProductionController {
  static async create(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Production);
      const p = repo.create(req.body);
      await repo.save(p);

      if (p.tipo === "miel" && p.referencia) {
        const hiveRepo = AppDataSource.getRepository(Hive);
        const hive = await hiveRepo.findOneBy({ id: p.referencia });
        if (hive) {
          hive.ultimaProduccionLitros = p.cantidadMiel || 0;
          await hiveRepo.save(hive);
        }
      }

      res.status(201).json(p);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Production);
    const list = await repo.find({ order: { fecha: "DESC" } });
    res.json(list);
  }
}

export default ProductionController;