import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), ProductsController.create);
router.get("/", authenticateJWT, ProductsController.list);
router.get("/:id", authenticateJWT, ProductsController.get);
router.put("/:id", authenticateJWT, authorizeRoles("admin", "worker"), ProductsController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), ProductsController.remove);

export default router;