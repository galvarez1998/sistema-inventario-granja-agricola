import { Router } from "express";
import SalesController from "../controllers/sales.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateSaleDto } from "../dtos/sale.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateSaleDto), SalesController.create);
router.get("/", authenticateJWT, SalesController.list);

export default router;