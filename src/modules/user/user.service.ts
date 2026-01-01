import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../src/config/db";

const createUserService = async (
  payload: Prisma.UserCreateInput
): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });

  return createdUser;
};

const getAllUsersService = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
      posts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const UserService = {
  createUserService,
  getAllUsersService,
};
