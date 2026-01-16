import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;