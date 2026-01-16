import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";
import { ApiError } from "../utils/ApiError";

class ProductsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const p = repo.create(req.body);
      await repo.save(p);
      res.status(201).json(p);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const prods = await repo.find();
      res.json(prods);
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const p = await repo.findOneBy({ id: req.params.id });
      if (!p) {
        return next(ApiError.notFound("Producto no encontrado"));
      }
      res.json(p);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const p = await repo.findOneBy({ id: req.params.id });
      if (!p) {
        return next(ApiError.notFound("Producto no encontrado"));
      }
      repo.merge(p, req.body);
      await repo.save(p);
      res.json(p);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = AppDataSource.getRepository(Product);
      const result = await repo.delete(req.params.id);
      res.json({ deleted: result.affected });
    } catch (err) {
      next(err);
    }
  }
}

export default ProductsController;