import "reflect-metadata";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import routes from "../src/routes";
import { errorMiddleware } from "../src/middlewares/error.middleware";
import { User } from "../src/models/User";
import { Animal } from "../src/models/Animal";
import { Product } from "../src/models/Product";
import { Movement } from "../src/models/Movement";
import { Production } from "../src/models/Production";
import { Sale } from "../src/models/Sale";
import { Hive } from "../src/models/Hive";

export async function createTestApp(): Promise<{ app: Application; dataSource: DataSource }> {
  // Create in-memory SQLite database for testing
  const dataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    logging: false,
    entities: [User, Animal, Product, Movement, Production, Sale, Hive],
  });

  await dataSource.initialize();

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", routes);
  app.get("/", (req, res) => res.json({ ok: true, version: "1.0" }));

  // Error middleware must be last
  app.use(errorMiddleware);

  return { app, dataSource };
}
