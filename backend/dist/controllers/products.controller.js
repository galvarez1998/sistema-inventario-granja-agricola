"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Product_1 = require("../models/Product");
const ApiError_1 = require("../utils/ApiError");
class ProductsController {
    static async create(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const p = repo.create(req.body);
            await repo.save(p);
            res.status(201).json(p);
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const prods = await repo.find();
            res.json(prods);
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const p = await repo.findOneBy({ id: req.params.id });
            if (!p) {
                return next(ApiError_1.ApiError.notFound("Producto no encontrado"));
            }
            res.json(p);
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const p = await repo.findOneBy({ id: req.params.id });
            if (!p) {
                return next(ApiError_1.ApiError.notFound("Producto no encontrado"));
            }
            repo.merge(p, req.body);
            await repo.save(p);
            res.json(p);
        }
        catch (err) {
            next(err);
        }
    }
    static async remove(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const result = await repo.delete(req.params.id);
            res.json({ deleted: result.affected });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = ProductsController;
