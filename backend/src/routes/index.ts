import { Router } from "express";
import authRoutes from "./auth.routes";
import animalRoutes from "./animals.routes";
import productRoutes from "./products.routes";
import movementRoutes from "./movements.routes";
import productionRoutes from "./production.routes";
import salesRoutes from "./sales.routes";
import hivesRoutes from "./hives.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/animals", animalRoutes);
router.use("/products", productRoutes);
router.use("/movements", movementRoutes);
router.use("/production", productionRoutes);
router.use("/sales", salesRoutes);
router.use("/hives", hivesRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;