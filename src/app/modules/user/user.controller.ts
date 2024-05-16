import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "admin created successfully",
    data: result,
  });
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Doctor created successfully",
    data: result,
  });
});
export const UserControlller = {
  createAdmin,
  createDoctor,
};
