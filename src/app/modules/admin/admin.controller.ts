import { Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { sendResopnse } from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { adminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await adminServices.getAllAdmin(filters, options);
    sendResopnse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
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
    sendResopnse(res, {
      success: true,
      statusCode: httpStatus.OK,
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
const updateAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.updateAdmin(
      req.params.adminId,
      req.body
    );
    sendResopnse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "update admin successfully",
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
const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.deleteAdmin(req.params.adminId);
    sendResopnse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "admin deleted successfully",
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
const softDeleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.softDeleteAdmin(req.params.adminId);
    sendResopnse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "admin deleted successfully",
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
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
