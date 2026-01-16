import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { validateUuidParam } from "../middlewares/param.middleware";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateProductDto), ProductsController.create);
router.get("/", authenticateJWT, ProductsController.list);
router.get("/:id", authenticateJWT, validateUuidParam("id"), ProductsController.get);
router.put("/:id", authenticateJWT, authorizeRoles("admin", "worker"), validateUuidParam("id"), validateDto(UpdateProductDto), ProductsController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), validateUuidParam("id"), ProductsController.remove);

export default router;