import { Router } from "express";
import MovementsController from "../controllers/movements.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateMovementDto } from "../dtos/movement.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateMovementDto), MovementsController.create);
router.get("/", authenticateJWT, MovementsController.list);

export default router;