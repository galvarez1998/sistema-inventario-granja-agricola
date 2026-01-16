import request from "supertest";
import { Application } from "express";
import { DataSource } from "typeorm";
import { createTestApp } from "./appFactory";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../src/models/User";

describe("Animals Endpoints", () => {
  let app: Application;
  let dataSource: DataSource;
  let adminToken: string;
  let workerToken: string;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    dataSource = testApp.dataSource;

    // Create admin and worker users
    const userRepo = dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash("testpass", 10);
    
    const admin = userRepo.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    await userRepo.save(admin);

    const worker = userRepo.create({
      username: "worker",
      password: hashedPassword,
      role: "worker",
    });
    await userRepo.save(worker);

    adminToken = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || "secret"
    );

    workerToken = jwt.sign(
      { id: worker.id, username: worker.username, role: worker.role },
      process.env.JWT_SECRET || "secret"
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("POST /api/animals", () => {
    it("should create a new animal with valid data", async () => {
      const response = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "cerdo",
          cantidad: 10,
          estado: "saludable",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.especie).toBe("cerdo");
      expect(response.body.cantidad).toBe(10);
    });

    it("should return 400 with invalid data", async () => {
      const response = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          // Missing required field: especie
          cantidad: 5,
        });

      expect(response.status).toBe(400);
    });

    it("should return 401 without authentication", async () => {
      const response = await request(app)
        .post("/api/animals")
        .send({
          especie: "gallina",
          cantidad: 20,
        });

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/animals", () => {
    beforeAll(async () => {
      await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "pollo",
          cantidad: 15,
          estado: "saludable",
        });
    });

    it("should list all animals", async () => {
      const response = await request(app)
        .get("/api/animals")
        .set("Authorization", `Bearer ${workerToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/animals/:id", () => {
    let animalId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "pez",
          cantidad: 100,
          estado: "saludable",
        });
      animalId = createResponse.body.id;
    });

    it("should get animal by id", async () => {
      const response = await request(app)
        .get(`/api/animals/${animalId}`)
        .set("Authorization", `Bearer ${workerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(animalId);
      expect(response.body.especie).toBe("pez");
    });

    it("should return 404 for non-existent animal", async () => {
      const response = await request(app)
        .get("/api/animals/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${workerToken}`);

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid UUID", async () => {
      const response = await request(app)
        .get("/api/animals/invalid-uuid")
        .set("Authorization", `Bearer ${workerToken}`);

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/animals/:id", () => {
    let animalId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "cerdo",
          cantidad: 5,
          estado: "saludable",
        });
      animalId = createResponse.body.id;
    });

    it("should update animal", async () => {
      const response = await request(app)
        .put(`/api/animals/${animalId}`)
        .set("Authorization", `Bearer ${workerToken}`)
        .send({
          cantidad: 8,
          estado: "enfermo",
        });

      expect(response.status).toBe(200);
      expect(response.body.cantidad).toBe(8);
      expect(response.body.estado).toBe("enfermo");
    });

    it("should return 404 for non-existent animal", async () => {
      const response = await request(app)
        .put("/api/animals/00000000-0000-0000-0000-000000000000")
        .set("Authorization", `Bearer ${workerToken}`)
        .send({
          cantidad: 10,
        });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/animals/:id", () => {
    let animalId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "gallina",
          cantidad: 3,
          estado: "saludable",
        });
      animalId = createResponse.body.id;
    });

    it("should delete animal with admin role", async () => {
      const response = await request(app)
        .delete(`/api/animals/${animalId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("deleted");
    });

    it("should return 403 for worker role", async () => {
      const createResponse = await request(app)
        .post("/api/animals")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          especie: "pato",
          cantidad: 2,
        });

      const response = await request(app)
        .delete(`/api/animals/${createResponse.body.id}`)
        .set("Authorization", `Bearer ${workerToken}`);

      expect(response.status).toBe(403);
    });
  });
});
