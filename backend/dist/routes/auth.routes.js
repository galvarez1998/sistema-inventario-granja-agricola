"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_dto_1 = require("../dtos/auth.dto");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 */
router.post("/register", (0, validation_middleware_1.validateDto)(auth_dto_1.RegisterDto), auth_controller_1.default.register);
router.post("/login", (0, validation_middleware_1.validateDto)(auth_dto_1.LoginDto), auth_controller_1.default.login);
exports.default = router;
