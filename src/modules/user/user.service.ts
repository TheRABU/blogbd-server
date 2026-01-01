import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../src/config/db";
import bcrypt from "bcrypt";

const createUserService = async (
  payload: Prisma.UserCreateInput
): Promise<User> => {
  const { email } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password as string, 12);

  payload.password = hashedPassword;

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

const getSingleUserService = async (id: number) => {
  const result = prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      posts: true,
    },
  });

  return result;
};

const updateUserByIdService = async (id: number, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUserByIdService = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserByIdService,
  deleteUserByIdService,
};
