"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const ApiError_1 = require("../utils/ApiError");
function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        });
    }
    // Log unexpected errors
    console.error("Unexpected error:", err);
    return res.status(500).json({
        message: "Internal server error",
        statusCode: 500,
    });
}
