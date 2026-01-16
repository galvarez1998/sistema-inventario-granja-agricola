"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Animal_1 = require("../models/Animal");
const ApiError_1 = require("../utils/ApiError");
class AnimalsController {
    static async create(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
            const animal = repo.create(req.body);
            await repo.save(animal);
            res.status(201).json(animal);
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
            const animals = await repo.find();
            res.json(animals);
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
            const animal = await repo.findOneBy({ id: req.params.id });
            if (!animal) {
                return next(ApiError_1.ApiError.notFound("Animal no encontrado"));
            }
            res.json(animal);
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
            const animal = await repo.findOneBy({ id: req.params.id });
            if (!animal) {
                return next(ApiError_1.ApiError.notFound("Animal no encontrado"));
            }
            repo.merge(animal, req.body);
            await repo.save(animal);
            res.json(animal);
        }
        catch (err) {
            next(err);
        }
    }
    static async remove(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(Animal_1.Animal);
            const result = await repo.delete(req.params.id);
            res.json({ deleted: result.affected });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = AnimalsController;
