import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../shared/jwtHelpers";
import prisma from "../../../shared/prisma";

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
export const authServices = {
  loginUser,
  refreshToken,
};
