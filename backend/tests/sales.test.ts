import request from "supertest";
import { Application } from "express";
import { DataSource } from "typeorm";
import { createTestApp } from "./appFactory";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../src/models/User";
import { Animal } from "../src/models/Animal";
import { Product } from "../src/models/Product";

describe("Sales Endpoints", () => {
  let app: Application;
  let dataSource: DataSource;
  let adminToken: string;
  let animalId: string;
  let productId: string;

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

    // Create test animal
    const animalRepo = dataSource.getRepository(Animal);
    const animal = animalRepo.create({
      especie: "cerdo",
      cantidad: 20,
      estado: "saludable",
    });
    await animalRepo.save(animal);
    animalId = animal.id;

    // Create test product
    const productRepo = dataSource.getRepository(Product);
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
      const response = await request(app)
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
      const animalRepo = dataSource.getRepository(Animal);
      const animal = await animalRepo.findOne({ where: { id: animalId } });
      expect(animal?.cantidad).toBe(15); // 20 - 5
    });

    it("should create a sale for product (eggs) and decrease inventory", async () => {
      const response = await request(app)
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
      const productRepo = dataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id: productId } });
      expect(product?.cantidadHuevos).toBe(70); // 100 - 30
    });

    it("should return 400 when selling more animals than available", async () => {
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
        .get("/api/sales")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
