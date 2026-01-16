import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Production } from "../models/Production";
import { Hive } from "../models/Hive";

class ProductionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Production);
      const p = repo.create(req.body) as unknown as Production;
      await repo.save(p);

      if (p.tipo === "miel" && p.referencia) {
        const hiveRepo = AppDataSource.getRepository(Hive);
        const hive = await hiveRepo.findOneBy({ id: p.referencia });
        if (hive && p.cantidadMiel) {
          hive.ultimaProduccionLitros = p.cantidadMiel;
          await hiveRepo.save(hive);
        }
      }

      res.status(201).json(p);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Production);
      const list = await repo.find({ order: { fecha: "DESC" } });
      res.json(list);
    } catch (err) {
      next(err);
    }
  }
}

export default ProductionController;