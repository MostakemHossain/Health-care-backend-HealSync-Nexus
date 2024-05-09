import express from "express";
import { UserControlller } from "./user.controller";
const router = express.Router();

router.post("/create-admin", UserControlller.createAdmin);

export const userRoutes = router;
