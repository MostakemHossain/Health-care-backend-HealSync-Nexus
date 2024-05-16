import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { sendResopnse } from "../../../shared/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, needPasswordChange, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResopnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successfully",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResopnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh Token Generated Successfully",
    data: result,
  });
});
const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await authServices.changePassword(user, req.body);
    sendResopnse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password change Successfully",
      data: result,
    });
  }
);
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.forgotPassword(req.body);
  sendResopnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Check Your email",
    data: null,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";
  const result = await authServices.resetPassword(token,req.body);
  sendResopnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: null,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
