"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movements_controller_1 = __importDefault(require("../controllers/movements.controller"));
const jwt_1 = require("../auth/jwt");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const movement_dto_1 = require("../dtos/movement.dto");
const router = (0, express_1.Router)();
router.post("/", jwt_1.authenticateJWT, (0, jwt_1.authorizeRoles)("admin", "worker"), (0, validation_middleware_1.validateDto)(movement_dto_1.CreateMovementDto), movements_controller_1.default.create);
router.get("/", jwt_1.authenticateJWT, movements_controller_1.default.list);
exports.default = router;
