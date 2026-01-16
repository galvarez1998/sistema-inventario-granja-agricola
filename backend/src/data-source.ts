import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Animal } from "./models/Animal";
import { Product } from "./models/Product";
import { Movement } from "./models/Movement";
import { Production } from "./models/Production";
import { Sale } from "./models/Sale";
import { Hive } from "./models/Hive";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "granja_db",
  synchronize: false,
  logging: false,
  entities: [User, Animal, Product, Movement, Production, Sale, Hive],
  migrations: ["src/migrations/*.ts"],
  subscribers: []
});