import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Hive } from "../models/Hive";
import { ApiError } from "../utils/ApiError";

class HivesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Hive);
      const hive = repo.create(req.body);
      await repo.save(hive);
      res.status(201).json(hive);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Hive);
      const hives = await repo.find();
      res.json(hives);
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Hive);
      const hive = await repo.findOneBy({ id: req.params.id });
      if (!hive) {
        return next(ApiError.notFound("Colmena no encontrada"));
      }
      res.json(hive);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Hive);
      const hive = await repo.findOneBy({ id: req.params.id });
      if (!hive) {
        return next(ApiError.notFound("Colmena no encontrada"));
      }
      repo.merge(hive, req.body);
      await repo.save(hive);
      res.json(hive);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Hive);
      const result = await repo.delete(req.params.id);
      res.json({ deleted: result.affected });
    } catch (err) {
      next(err);
    }
  }
}

export default HivesController;
