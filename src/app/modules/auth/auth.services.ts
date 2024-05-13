import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
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
    "skssnwdownwenqiofnieqoeoifneqiof3ib390389few98n3fn983f1930903sk023j0de2n0fd943nf930n9f3f94f3",
    "5m"
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "skssnwdownwd3joo1iibof1bfienqiofnieqoedrrr22edoifneqiof3ib390389few98n3fn983f1930903sk023j0de2n0ddo1oi1fd943nf930n9f3f94f3snodn3io1o",
    "30d"
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
      "skssnwdownwd3joo1iibof1bfienqiofnieqoedrrr22edoifneqiof3ib390389few98n3fn983f1930903sk023j0de2n0ddo1oi1fd943nf930n9f3f94f3snodn3io1o"
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
    "skssnwdownwenqiofnieqoeoifneqiof3ib390389few98n3fn983f1930903sk023j0de2n0fd943nf930n9f3f94f3",
    "5m"
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
