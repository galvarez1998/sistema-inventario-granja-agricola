"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const jwt_1 = require("../auth/jwt");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const param_middleware_1 = require("../middlewares/param.middleware");
const product_dto_1 = require("../dtos/product.dto");
const router = (0, express_1.Router)();
router.post("/", jwt_1.authenticateJWT, (0, jwt_1.authorizeRoles)("admin", "worker"), (0, validation_middleware_1.validateDto)(product_dto_1.CreateProductDto), products_controller_1.default.create);
router.get("/", jwt_1.authenticateJWT, products_controller_1.default.list);
router.get("/:id", jwt_1.authenticateJWT, (0, param_middleware_1.validateUuidParam)("id"), products_controller_1.default.get);
router.put("/:id", jwt_1.authenticateJWT, (0, jwt_1.authorizeRoles)("admin", "worker"), (0, param_middleware_1.validateUuidParam)("id"), (0, validation_middleware_1.validateDto)(product_dto_1.UpdateProductDto), products_controller_1.default.update);
router.delete("/:id", jwt_1.authenticateJWT, (0, jwt_1.authorizeRoles)("admin"), (0, param_middleware_1.validateUuidParam)("id"), products_controller_1.default.remove);
exports.default = router;
