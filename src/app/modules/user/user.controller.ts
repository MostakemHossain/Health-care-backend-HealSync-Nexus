import { Request, Response } from "express";
import { userServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createAdmin(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "admin created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went Wrong",
      error: error,
    });
  }
};
export const UserControlller = {
  createAdmin,
};
