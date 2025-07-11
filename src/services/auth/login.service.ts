import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { comparePassword } from "../../lib/argon";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

interface Body extends Pick<User, "email" | "password"> {}

export const loginService = async (body: Body) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("invalid email address");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("incorect password");
    }

    const { password: pass, ...userWhitoutPassword } = user;

    const token = sign({ id: user.id }, JWT_SECRET!, { expiresIn: "2h" });

    return { ...userWhitoutPassword, token };
  } catch (error) {
    throw error;
  }
};
