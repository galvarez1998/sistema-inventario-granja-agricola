"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Production_1 = require("../models/Production");
const Hive_1 = require("../models/Hive");
class ProductionController {
    static async create(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Production_1.Production);
            const p = repo.create(req.body);
            await repo.save(p);
            if (p.tipo === "miel" && p.referencia) {
                const hiveRepo = data_source_1.AppDataSource.getRepository(Hive_1.Hive);
                const hive = await hiveRepo.findOneBy({ id: p.referencia });
                if (hive && p.cantidadMiel) {
                    hive.ultimaProduccionLitros = p.cantidadMiel;
                    await hiveRepo.save(hive);
                }
            }
            res.status(201).json(p);
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Production_1.Production);
            const list = await repo.find({ order: { fecha: "DESC" } });
            res.json(list);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = ProductionController;
