"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
class AuthController {
    static async register(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const { username, password, role } = req.body;
            const exists = await repo.findOneBy({ username });
            if (exists) {
                return next(ApiError_1.ApiError.conflict("Usuario ya existe"));
            }
            const hash = await bcrypt_1.default.hash(password, 10);
            const user = repo.create({ username, password: hash, role: role || "worker" });
            await repo.save(user);
            res.status(201).json({ id: user.id, username: user.username });
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const { username, password } = req.body;
            const user = await repo.findOneBy({ username });
            if (!user) {
                return next(ApiError_1.ApiError.unauthorized("Credenciales inválidas"));
            }
            const ok = await bcrypt_1.default.compare(password, user.password);
            if (!ok) {
                return next(ApiError_1.ApiError.unauthorized("Credenciales inválidas"));
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
            res.json({ token });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = AuthController;
