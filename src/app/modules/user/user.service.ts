import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const createAdmin = async (payload: any) => {
    const hashedPassword:string=await bcrypt.hash(payload.password,10)
  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const createAdmin = await tx.admin.create({
      data: payload.admin,
    });
    return createAdmin;
  });

  return result;
};

export const userServices = {
  createAdmin,
};
