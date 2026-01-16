"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Animal_1 = require("../models/Animal");
const Production_1 = require("../models/Production");
const Product_1 = require("../models/Product");
const Sale_1 = require("../models/Sale");
class DashboardController {
    static async summary(req, res) {
        const animalRepo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
        const prodRepo = data_source_1.AppDataSource.getRepository(Production_1.Production);
        const productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
        const saleRepo = data_source_1.AppDataSource.getRepository(Sale_1.Sale);
        // Cantidad de animales por tipo
        const animals = await animalRepo.find();
        const animalsByType = {};
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
exports.default = DashboardController;
