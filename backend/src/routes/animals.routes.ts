import { Router } from "express";
import AnimalsController from "../controllers/animals.controller";
import { authenticateJWT, authorizeRoles } from "../auth/jwt";
import { validateDto } from "../middlewares/validation.middleware";
import { validateUuidParam } from "../middlewares/param.middleware";
import { CreateAnimalDto, UpdateAnimalDto } from "../dtos/animal.dto";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin", "worker"), validateDto(CreateAnimalDto), AnimalsController.create);
router.get("/", authenticateJWT, AnimalsController.list);
router.get("/:id", authenticateJWT, validateUuidParam("id"), AnimalsController.get);
router.put("/:id", authenticateJWT, authorizeRoles("admin", "worker"), validateUuidParam("id"), validateDto(UpdateAnimalDto), AnimalsController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), validateUuidParam("id"), AnimalsController.remove);

export default router;