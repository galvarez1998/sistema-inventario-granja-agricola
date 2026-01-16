"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const appFactory_1 = require("./appFactory");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../src/models/User");
describe("Auth Endpoints", () => {
    let app;
    let dataSource;
    beforeAll(async () => {
        const testApp = await (0, appFactory_1.createTestApp)();
        app = testApp.app;
        dataSource = testApp.dataSource;
    });
    afterAll(async () => {
        await dataSource.destroy();
    });
    describe("POST /api/auth/register", () => {
        it("should register a new user", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .send({
                username: "testuser",
                password: "password123",
                role: "worker",
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("username", "testuser");
        });
        it("should return 400 if username already exists", async () => {
            await (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .send({
                username: "duplicate",
                password: "password123",
            });
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .send({
                username: "duplicate",
                password: "password123",
            });
            expect(response.status).toBe(409);
        });
        it("should return 400 if validation fails", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/register")
                .send({
                username: "test",
                password: "123", // Too short
            });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Validation failed");
        });
    });
    describe("POST /api/auth/login", () => {
        beforeAll(async () => {
            const userRepo = dataSource.getRepository(User_1.User);
            const hashedPassword = await bcrypt_1.default.hash("testpass", 10);
            const user = userRepo.create({
                username: "logintest",
                password: hashedPassword,
                role: "worker",
            });
            await userRepo.save(user);
        });
        it("should login with valid credentials", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/login")
                .send({
                username: "logintest",
                password: "testpass",
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
        });
        it("should return 401 with invalid credentials", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/login")
                .send({
                username: "logintest",
                password: "wrongpass",
            });
            expect(response.status).toBe(401);
        });
        it("should return 401 if user not found", async () => {
            const response = await (0, supertest_1.default)(app)
                .post("/api/auth/login")
                .send({
                username: "nonexistent",
                password: "testpass",
            });
            expect(response.status).toBe(401);
        });
    });
});
