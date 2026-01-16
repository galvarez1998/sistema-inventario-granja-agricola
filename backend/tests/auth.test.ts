import request from "supertest";
import { Application } from "express";
import { DataSource } from "typeorm";
import { createTestApp } from "./appFactory";
import bcrypt from "bcrypt";
import { User } from "../src/models/User";

describe("Auth Endpoints", () => {
  let app: Application;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    dataSource = testApp.dataSource;
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
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
      await request(app)
        .post("/api/auth/register")
        .send({
          username: "duplicate",
          password: "password123",
        });

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          username: "duplicate",
          password: "password123",
        });

      expect(response.status).toBe(409);
    });

    it("should return 400 if validation fails", async () => {
      const response = await request(app)
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
      const userRepo = dataSource.getRepository(User);
      const hashedPassword = await bcrypt.hash("testpass", 10);
      const user = userRepo.create({
        username: "logintest",
        password: hashedPassword,
        role: "worker",
      });
      await userRepo.save(user);
    });

    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          username: "logintest",
          password: "testpass",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          username: "logintest",
          password: "wrongpass",
        });

      expect(response.status).toBe(401);
    });

    it("should return 401 if user not found", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          username: "nonexistent",
          password: "testpass",
        });

      expect(response.status).toBe(401);
    });
  });
});
