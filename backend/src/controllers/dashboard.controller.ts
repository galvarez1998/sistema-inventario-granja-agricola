import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Animal } from "../models/Animal";
import { Production } from "../models/Production";
import { Product } from "../models/Product";
import { Sale } from "../models/Sale";

class DashboardController {
  static async summary(req: Request, res: Response) {
    const animalRepo = AppDataSource.getRepository(Animal);
    const prodRepo = AppDataSource.getRepository(Production);
    const productRepo = AppDataSource.getRepository(Product);
    const saleRepo = AppDataSource.getRepository(Sale);

    // Cantidad de animales por tipo
    const animals = await animalRepo.find();
    const animalsByType: Record<string, number> = {};
    animals.forEach((a) => {
      animalsByType[a.especie] = (animalsByType[a.especie] || 0) + a.cantidad;
    });

    // Produccion total de miel
    const mielList = await prodRepo.findBy({ tipo: "miel" });
    const totalMiel = mielList.reduce((s, p) => s + (p.cantidadMiel || 0), 0);

    // Huevos por día: recent 7 days
    const huevos = await prodRepo.findBy({ tipo: "huevos" });

    // Carne producida vs vendida (aggregate simplificado)
    const carnes = await productRepo.findBy({ tipo: "carne" });
    const carneProducida = carnes.reduce((s, c) => s + (c.peso || 0), 0);
    const ventas = await saleRepo.findBy({ tipo: "producto" });
    const carneVendida = ventas.reduce((s, v) => s + (v.precioTotal || 0), 0);

    res.json({
      animalsByType,
      totalMiel,
      huevos,
      carneProducida,
      carneVendida
    });
  }
}

export default DashboardController;