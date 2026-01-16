"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDto(dtoClass) {
    return async (req, res, next) => {
        try {
            const dtoInstance = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
            const errors = await (0, class_validator_1.validate)(dtoInstance, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });
            if (errors.length > 0) {
                const messages = errors.map((error) => {
                    return Object.values(error.constraints || {}).join(", ");
                });
                return res.status(400).json({
                    message: "Validation failed",
                    errors: messages,
                });
            }
            req.body = dtoInstance;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
