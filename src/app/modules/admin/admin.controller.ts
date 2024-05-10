import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { adminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await adminServices.getAllAdmin(filters, options);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "get All Admin retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went Wrong",
      error: error,
    });
  }
};
const getSingleAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getSingleAdmin(req.params.adminId);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "get Single Admin retrieved successfully",

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
  getSingleAdmin,
};
