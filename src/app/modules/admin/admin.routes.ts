import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidation } from "./adminValidation";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAllAdmin
);
router.get(
  "/:adminId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getSingleAdmin
);
router.patch(
  "/:adminId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.updateAdminValidationSchema),
  adminController.updateAdmin
);
router.delete(
  "/:adminId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.deleteAdmin
);
router.delete(
  "/soft/:adminId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.softDeleteAdmin
);

export const adminRoutes = router;
