import { Router } from "express";
import MovementsController from "../controllers/movements.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), MovementsController.create);
router.get("/", authenticateJWT, MovementsController.list);

export default router;