"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const jwt_1 = require("../auth/jwt");
const router = (0, express_1.Router)();
router.get("/summary", jwt_1.authenticateJWT, dashboard_controller_1.default.summary);
exports.default = router;
