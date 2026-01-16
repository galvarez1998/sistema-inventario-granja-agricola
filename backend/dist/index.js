"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const error_middleware_1 = require("./middlewares/error.middleware");
const PORT = process.env.PORT || 4000;
async function start() {
    await data_source_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use("/api", routes_1.default);
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    app.get("/", (req, res) => res.json({ ok: true, version: "1.0" }));
    // Error middleware must be last
    app.use(error_middleware_1.errorMiddleware);
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
        console.log(`Swagger docs: http://localhost:${PORT}/docs`);
    });
}
start().catch((err) => {
    console.error("Error starting server:", err);
});
