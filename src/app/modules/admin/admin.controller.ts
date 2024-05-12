import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { sendResopnse } from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { adminServices } from "./admin.service";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
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
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getSingleAdmin(req.params.adminId);
  sendResopnse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "get Single Admin retrieved successfully",
    data: result,
  });
});
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.updateAdmin(req.params.adminId, req.body);
  sendResopnse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "update admin successfully",
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.deleteAdmin(req.params.adminId);
  sendResopnse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin deleted successfully",
    data: result,
  });
});
const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.softDeleteAdmin(req.params.adminId);
  sendResopnse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "admin deleted successfully",
    data: result,
  });
});
export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
