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

export const UserService = {
  createUserService,
};
