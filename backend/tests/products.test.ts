import request from "supertest";
import { Application } from "express";
import { DataSource } from "typeorm";
import { createTestApp } from "./appFactory";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../src/models/User";

describe("Products Endpoints", () => {
  let app: Application;
  let dataSource: DataSource;
  let adminToken: string;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    dataSource = testApp.dataSource;

    const userRepo = dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash("testpass", 10);
    const admin = userRepo.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    await userRepo.save(admin);

    adminToken = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || "secret"
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("POST /api/products", () => {
    it("should create a new product (eggs)", async () => {
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/products/:id", () => {
    let productId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
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
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(productId);
      expect(response.body.tipo).toBe("miel");
    });

    it("should return 404 for non-existent product", async () => {
      const response = await request(app)
        .get("/api/products/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });
});
