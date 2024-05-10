import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:adminId", adminController.getSingleAdmin);
router.patch("/:adminId", adminController.updateAdmin);

export const adminRoutes = router;
