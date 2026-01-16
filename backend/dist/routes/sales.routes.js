"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = __importDefault(require("../controllers/sales.controller"));
const jwt_1 = require("../auth/jwt");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const sale_dto_1 = require("../dtos/sale.dto");
const router = (0, express_1.Router)();
router.post("/", jwt_1.authenticateJWT, (0, jwt_1.authorizeRoles)("admin", "worker"), (0, validation_middleware_1.validateDto)(sale_dto_1.CreateSaleDto), sales_controller_1.default.create);
router.get("/", jwt_1.authenticateJWT, sales_controller_1.default.list);
exports.default = router;
