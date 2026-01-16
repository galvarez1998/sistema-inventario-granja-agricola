"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestApp = createTestApp;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const routes_1 = __importDefault(require("../src/routes"));
const error_middleware_1 = require("../src/middlewares/error.middleware");
const User_1 = require("../src/models/User");
const Animal_1 = require("../src/models/Animal");
const Product_1 = require("../src/models/Product");
const Movement_1 = require("../src/models/Movement");
const Production_1 = require("../src/models/Production");
const Sale_1 = require("../src/models/Sale");
const Hive_1 = require("../src/models/Hive");
async function createTestApp() {
    // Create in-memory SQLite database for testing
    const dataSource = new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        logging: false,
        entities: [User_1.User, Animal_1.Animal, Product_1.Product, Movement_1.Movement, Production_1.Production, Sale_1.Sale, Hive_1.Hive],
    });
    await dataSource.initialize();
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use("/api", routes_1.default);
    app.get("/", (req, res) => res.json({ ok: true, version: "1.0" }));
    // Error middleware must be last
    app.use(error_middleware_1.errorMiddleware);
    return { app, dataSource };
}
