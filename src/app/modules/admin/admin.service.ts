import { Admin, Prisma, UserStatus } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { adminSearchAbleFields } from "./admin.constant";
import { TAdminFilterRequest } from "./admin.interface";

const getAllAdmin = async (
  params: TAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  andConditions.push({
    isDeleted: false,
  });
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
const updateAdmin = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    const deleteAdmin = await tx.admin.delete({
      where: {
        id,
      },
    });
    await tx.user.delete({
      where: {
        email: deleteAdmin.email,
      },
    });
    return deleteAdmin;
  });
  return result;
};
const softDeleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    const deleteAdmin = await tx.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await tx.user.update({
      where: {
        email: deleteAdmin.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return deleteAdmin;
  });
  return result;
};
export const adminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
