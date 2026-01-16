"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUuidParam = validateUuidParam;
const uuid_1 = require("uuid");
const ApiError_1 = require("../utils/ApiError");
function validateUuidParam(paramName = "id") {
    return (req, res, next) => {
        const paramValue = req.params[paramName];
        if (!paramValue || !(0, uuid_1.validate)(paramValue)) {
            return next(ApiError_1.ApiError.badRequest(`Invalid UUID format for parameter: ${paramName}`));
        }
        next();
    };
}
