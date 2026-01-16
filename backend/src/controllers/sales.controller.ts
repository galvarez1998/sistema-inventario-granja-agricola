import { Request, Response, NextFunction } from "express";
import { SalesService } from "../services/sales.service";

class SalesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const sale = await SalesService.createSaleWithInventoryUpdate(req.body);
      res.status(201).json(sale);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { AppDataSource } = await import("../data-source");
      const { Sale } = await import("../models/Sale");
      const repo = AppDataSource.getRepository(Sale);
      const all = await repo.find({ order: { fecha: "DESC" } });
      res.json(all);
    } catch (err) {
      next(err);
    }
  }
}

export default SalesController;