import { Router } from "express";
import ProductionController from "../controllers/production.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), ProductionController.create);
router.get("/", authenticateJWT, ProductionController.list);

export default router;