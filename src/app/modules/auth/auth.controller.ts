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

export const authController = {
  loginUser,
};
