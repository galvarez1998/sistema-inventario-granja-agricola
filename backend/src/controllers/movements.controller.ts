import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services/inventory.service";

class MovementsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const movement = await InventoryService.createMovementWithInventoryUpdate(req.body);
      res.status(201).json(movement);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { AppDataSource } = await import("../data-source");
      const { Movement } = await import("../models/Movement");
      const repo = AppDataSource.getRepository(Movement);
      const all = await repo.find({ order: { fecha: "DESC" } });
      res.json(all);
    } catch (err) {
      next(err);
    }
  }
}

export default MovementsController;