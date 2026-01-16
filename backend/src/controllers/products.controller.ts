import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";

class ProductsController {
  static async create(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const p = repo.create(req.body);
      await repo.save(p);
      res.status(201).json(p);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Product);
    const prods = await repo.find();
    res.json(prods);
  }

  static async get(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Product);
    const p = await repo.findOneBy({ id: req.params.id });
    if (!p) return res.status(404).json({ message: "No encontrado" });
    res.json(p);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Product);
    const p = await repo.findOneBy({ id: req.params.id });
    if (!p) return res.status(404).json({ message: "No encontrado" });
    repo.merge(p, req.body);
    await repo.save(p);
    res.json(p);
  }

  static async remove(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Product);
    const result = await repo.delete(req.params.id);
    res.json({ deleted: result.affected });
  }
}

export default ProductsController;