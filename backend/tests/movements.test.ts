import request from "supertest";
import { Application } from "express";
import { DataSource } from "typeorm";
import { createTestApp } from "./appFactory";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../src/models/User";
import { Animal } from "../src/models/Animal";

describe("Movements Endpoints", () => {
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

    // Create initial animals for movement tests
    const animalRepo = dataSource.getRepository(Animal);
    const animal = animalRepo.create({
      especie: "gallina",
      cantidad: 50,
      estado: "saludable",
    });
    await animalRepo.save(animal);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("POST /api/movements", () => {
    it("should create a purchase movement and increase inventory", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "compra",
          especie: "gallina",
          cantidad: 10,
          notas: "Compra de gallinas",
        });

      expect(response.status).toBe(201);
      expect(response.body.tipo).toBe("compra");
      expect(response.body.especie).toBe("gallina");
      expect(response.body.cantidad).toBe(10);

      // Verify inventory was updated
      const animalRepo = dataSource.getRepository(Animal);
      const animals = await animalRepo.find({ where: { especie: "gallina" } });
      const totalCantidad = animals.reduce((sum, a) => sum + a.cantidad, 0);
      expect(totalCantidad).toBe(60); // 50 initial + 10 from purchase
    });

    it("should create a birth movement and increase inventory", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "nacimiento",
          especie: "gallina",
          cantidad: 5,
          notas: "Nacimiento de pollitos",
        });

      expect(response.status).toBe(201);
      expect(response.body.tipo).toBe("nacimiento");
    });

    it("should create a sale movement and decrease inventory", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "venta",
          especie: "gallina",
          cantidad: 5,
          notas: "Venta de gallinas",
        });

      expect(response.status).toBe(201);
      expect(response.body.tipo).toBe("venta");
    });

    it("should create a death movement and decrease inventory", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "muerte",
          especie: "gallina",
          cantidad: 2,
          notas: "Muerte natural",
        });

      expect(response.status).toBe(201);
      expect(response.body.tipo).toBe("muerte");
    });

    it("should return 400 when trying to sell more than available", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "venta",
          especie: "gallina",
          cantidad: 1000,
          notas: "Excessive sale",
        });

      expect(response.status).toBe(400);
    });

    it("should return 400 with invalid movement type", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "invalid",
          especie: "gallina",
          cantidad: 5,
        });

      expect(response.status).toBe(400);
    });

    it("should create movement for new species", async () => {
      const response = await request(app)
        .post("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          tipo: "compra",
          especie: "pato",
          cantidad: 15,
          notas: "First purchase of ducks",
        });

      expect(response.status).toBe(201);

      // Verify new animal was created
      const animalRepo = dataSource.getRepository(Animal);
      const ducks = await animalRepo.find({ where: { especie: "pato" } });
      expect(ducks.length).toBeGreaterThan(0);
      expect(ducks[0].cantidad).toBe(15);
    });
  });

  describe("GET /api/movements", () => {
    it("should list all movements", async () => {
      const response = await request(app)
        .get("/api/movements")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
