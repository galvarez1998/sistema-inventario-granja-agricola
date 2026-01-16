import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 */
router.post("/register", validateDto(RegisterDto), AuthController.register);
router.post("/login", validateDto(LoginDto), AuthController.login);

export default router;