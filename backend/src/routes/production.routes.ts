import { Router } from "express";
import ProductionController from "../controllers/production.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateProductionDto } from "../dtos/production.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateProductionDto), ProductionController.create);
router.get("/", authenticateJWT, ProductionController.list);

export default router;