import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

const loginCredentialsService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found!");
  }
  const comparedPass = await bcrypt.compare(password, user.password as string);

  if (!comparedPass) {
    throw new Error("Passwords do not match");
  }

  const JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const accessToken = generateToken(
    JwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES as string
  );

  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  loginCredentialsService,
};
