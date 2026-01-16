import { Router } from "express";
import SalesController from "../controllers/sales.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), SalesController.create);
router.get("/", authenticateJWT, SalesController.list);

export default router;