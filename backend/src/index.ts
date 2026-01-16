import express from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";

const PORT = process.env.PORT || 4000;

async function start() {
  await AppDataSource.initialize();
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", routes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/", (req, res) => res.json({ ok: true, version: "1.0" }));

  // Error middleware must be last
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/docs`);
  });
}

start().catch((err) => {
  console.error("Error starting server:", err);
});