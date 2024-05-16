import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploads";
import { UserControlller } from "./user.controller";
import { userValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/create-admin",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return UserControlller.createAdmin(req, res, next);
  }
);
router.post(
  "/create-doctor",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return UserControlller.createDoctor(req, res, next);
  }
);

export const userRoutes = router;
