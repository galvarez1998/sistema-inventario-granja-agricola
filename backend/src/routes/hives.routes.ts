import { Router } from "express";
import HivesController from "../controllers/hives.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { validateUuidParam } from "../middlewares/param.middleware";
import { CreateHiveDto, UpdateHiveDto } from "../dtos/hive.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateHiveDto), HivesController.create);
router.get("/", authenticateJWT, HivesController.list);
router.get("/:id", authenticateJWT, validateUuidParam("id"), HivesController.get);
router.put("/:id", authenticateJWT, authorizeRoles("admin", "worker"), validateUuidParam("id"), validateDto(UpdateHiveDto), HivesController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), validateUuidParam("id"), HivesController.remove);

export default router;
