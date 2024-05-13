import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { UserControlller } from "./user.controller";
const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControlller.createAdmin
);

export const userRoutes = router;
