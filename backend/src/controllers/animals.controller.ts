import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Animal } from "../models/Animal";
import { ApiError } from "../utils/ApiError";

class AnimalsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const animal = repo.create(req.body);
      await repo.save(animal);
      res.status(201).json(animal);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const animals = await repo.find();
      res.json(animals);
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const animal = await repo.findOneBy({ id: req.params.id });
      if (!animal) {
        return next(ApiError.notFound("Animal no encontrado"));
      }
      res.json(animal);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const animal = await repo.findOneBy({ id: req.params.id });
      if (!animal) {
        return next(ApiError.notFound("Animal no encontrado"));
      }
      repo.merge(animal, req.body);
      await repo.save(animal);
      res.json(animal);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const result = await repo.delete(req.params.id);
      res.json({ deleted: result.affected });
    } catch (err) {
      next(err);
    }
  }
}

export default AnimalsController;