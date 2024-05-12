import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidation } from "./adminValidation";
const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:adminId", adminController.getSingleAdmin);
router.patch(
  "/:adminId",
  validateRequest(adminValidation.updateAdminValidationSchema),
  adminController.updateAdmin
);
router.delete("/:adminId", adminController.deleteAdmin);
router.delete("/soft/:adminId", adminController.softDeleteAdmin);

export const adminRoutes = router;
