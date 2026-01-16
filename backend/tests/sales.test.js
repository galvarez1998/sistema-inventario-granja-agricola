"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const appFactory_1 = require("./appFactory");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../src/models/User");
const Animal_1 = require("../src/models/Animal");
const Product_1 = require("../src/models/Product");
describe("Sales Endpoints", () => {
    let app;
    let dataSource;
    let adminToken;
    let animalId;
    let productId;
    beforeAll(async () => {
        const testApp = await (0, appFactory_1.createTestApp)();
        app = testApp.app;
        dataSource = testApp.dataSource;
        const userRepo = dataSource.getRepository(User_1.User);
        const hashedPassword = await bcrypt_1.default.hash("testpass", 10);
        const admin = userRepo.create({
            username: "admin",
            password: hashedPassword,
            role: "admin",
        });
        await userRepo.save(admin);
        adminToken = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username, role: admin.role }, process.env.JWT_SECRET || "secret");
        // Create test animal
        const animalRepo = dataSource.getRepository(Animal_1.Animal);
        const animal = animalRepo.create({
            especie: "cerdo",
            cantidad: 20,
            estado: "saludable",
        });
        await animalRepo.save(animal);
        animalId = animal.id;
        // Create test product
        const productRepo = dataSource.getRepository(Product_1.Product);
        const product = productRepo.create({
            tipo: "huevo",
            cantidadHuevos: 100,
            fechaRecoleccion: "2024-01-15",
            lote: "L001",
        });
        await productRepo.save(product);
        productId = product.id;
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
    describe("POST /api/sales", () => {
        it("should create a sale for animal and decrease inventory", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "animal",
                referenciaId: animalId,
                cantidad: 5,
                precioTotal: 500.50,
                notas: "Sale of pigs",
            });
            expect(response.status).toBe(201);
            expect(response.body.tipo).toBe("animal");
            expect(response.body.cantidad).toBe(5);
            expect(response.body.precioTotal).toBe(500.50);
            // Verify inventory was updated
            const animalRepo = dataSource.getRepository(Animal_1.Animal);
            const animal = await animalRepo.findOne({ where: { id: animalId } });
            expect(animal?.cantidad).toBe(15); // 20 - 5
        });
        it("should create a sale for product (eggs) and decrease inventory", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "producto",
                referenciaId: productId,
                cantidad: 30,
                precioTotal: 15.00,
                notas: "Sale of eggs",
            });
            expect(response.status).toBe(201);
            expect(response.body.tipo).toBe("producto");
            // Verify product quantity was updated
            const productRepo = dataSource.getRepository(Product_1.Product);
            const product = await productRepo.findOne({ where: { id: productId } });
            expect(product?.cantidadHuevos).toBe(70); // 100 - 30
        });
        it("should return 400 when selling more animals than available", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "animal",
                referenciaId: animalId,
                cantidad: 1000,
                precioTotal: 10000,
            });
            expect(response.status).toBe(400);
        });
        it("should return 400 when selling more eggs than available", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "producto",
                referenciaId: productId,
                cantidad: 1000,
                precioTotal: 500,
            });
            expect(response.status).toBe(400);
        });
        it("should return 404 when product not found", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "producto",
                referenciaId: "00000000-0000-0000-0000-000000000000",
                cantidad: 10,
                precioTotal: 50,
            });
            expect(response.status).toBe(404);
        });
        it("should return 400 with invalid UUID", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "producto",
                referenciaId: "invalid-uuid",
                cantidad: 10,
                precioTotal: 50,
            });
            expect(response.status).toBe(400);
        });
        it("should return 400 with invalid tipo", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "invalid",
                referenciaId: animalId,
                cantidad: 1,
                precioTotal: 100,
            });
            expect(response.status).toBe(400);
        });
    });
    describe("GET /api/sales", () => {
        it("should list all sales", async () => {
            const response = await (0, supertest_1.default)(app)
                .get("/api/sales")
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});
