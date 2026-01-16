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
describe("Products Endpoints", () => {
    let app;
    let dataSource;
    let adminToken;
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
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
    describe("POST /api/products", () => {
        it("should create a new product (eggs)", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/products")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "huevo",
                cantidadHuevos: 100,
                fechaRecoleccion: "2024-01-15",
                lote: "L001",
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body.tipo).toBe("huevo");
            expect(response.body.cantidadHuevos).toBe(100);
        });
        it("should create a new product (meat)", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/products")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "carne",
                procedencia: "cerdo",
                peso: 15.5,
                fechaSacrificio: "2024-01-14",
            });
            expect(response.status).toBe(201);
            expect(response.body.tipo).toBe("carne");
            expect(response.body.procedencia).toBe("cerdo");
        });
        it("should return 400 with invalid tipo", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/products")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "invalid",
                cantidadHuevos: 50,
            });
            expect(response.status).toBe(400);
        });
    });
    describe("GET /api/products", () => {
        it("should list all products", async () => {
            const response = await (0, supertest_1.default)(app)
                .get("/api/products")
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
    describe("GET /api/products/:id", () => {
        let productId;
        beforeAll(async () => {
            const createResponse = await (0, supertest_1.default)(app)
                .post("/api/products")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                tipo: "miel",
                cantidadMiel: 5.2,
                colmenaOrigen: "Colmena-1",
                fechaExtraccion: "2024-01-10",
            });
            productId = createResponse.body.id;
        });
        it("should get product by id", async () => {
            const response = await (0, supertest_1.default)(app)
                .get(`/api/products/${productId}`)
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(productId);
            expect(response.body.tipo).toBe("miel");
        });
        it("should return 404 for non-existent product", async () => {
            const response = await (0, supertest_1.default)(app)
                .get("/api/products/00000000-0000-0000-0000-000000000000")
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(404);
        });
    });
});
