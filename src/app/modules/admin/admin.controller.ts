import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllAdmin();
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "get All Admin retrieved successfully",
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
export const adminController = {
  getAllAdmin,
};