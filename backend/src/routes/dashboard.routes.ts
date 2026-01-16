import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller";
import { authenticateJWT } from "../auth/jwt";

const router = Router();

router.get("/summary", authenticateJWT, DashboardController.summary);

export default router;