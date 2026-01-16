"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Production = void 0;
const typeorm_1 = require("typeorm");
/**
 * Registros de producción diaria/semanal: huevos recolectados, miel, ganancias en peso
 */
let Production = class Production {
};
exports.Production = Production;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Production.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Production.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Production.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Object)
], Production.prototype, "cantidadHuevos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real", nullable: true }),
    __metadata("design:type", Object)
], Production.prototype, "cantidadMiel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real", nullable: true }),
    __metadata("design:type", Object)
], Production.prototype, "gananciaPeso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Production.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Production.prototype, "createdAt", void 0);
exports.Production = Production = __decorate([
    (0, typeorm_1.Entity)()
], Production);
