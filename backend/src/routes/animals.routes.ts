import { Router } from "express";
import AnimalsController from "../controllers/animals.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), AnimalsController.create);
router.get("/", authenticateJWT, AnimalsController.list);
router.get("/:id", authenticateJWT, AnimalsController.get);
router.put("/:id", authenticateJWT, authorizeRoles("admin", "worker"), AnimalsController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), AnimalsController.remove);

export default router;