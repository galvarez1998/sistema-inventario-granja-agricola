import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Animal } from "../models/Animal";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

class AnimalsController {
  static async create(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Animal);
      const animal = repo.create(req.body);
      await repo.save(animal);
      res.status(201).json(animal);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Animal);
    const animals = await repo.find();
    res.json(animals);
  }

  static async get(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Animal);
    const animal = await repo.findOneBy({ id: req.params.id });
    if (!animal) return res.status(404).json({ message: "No encontrado" });
    res.json(animal);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Animal);
    const animal = await repo.findOneBy({ id: req.params.id });
    if (!animal) return res.status(404).json({ message: "No encontrado" });
    repo.merge(animal, req.body);
    await repo.save(animal);
    res.json(animal);
  }

  static async remove(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Animal);
    const result = await repo.delete(req.params.id);
    res.json({ deleted: result.affected });
  }
}

export default AnimalsController;