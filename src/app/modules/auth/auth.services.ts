import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../../config";
import { jwtHelpers } from "../../../shared/jwtHelpers";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/appError";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.hash(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_access_serect as string,
    config.jwt.jwt_access_serect_exipres_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_refresh_serect as string,
    config.jwt.jwt_refresh_serect_exipres_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_serect as string
    );
  } catch (error) {
    throw new Error("You are not Authorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken?.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_access_serect as string,
    config.jwt.jwt_access_serect_exipres_in as string
  );
  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  console.log(isCorrectPassword);
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  const updateUser = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
  return updateUser;
};
export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
};
