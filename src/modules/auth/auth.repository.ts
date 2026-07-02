import { prisma } from "../../lib/prisma.js";
import { Prisma, type User } from "@prisma/client";

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async updateRefreshToken(
    userId: string,
    token: string,
  ): Promise<User | null> {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: token },
    });
  }
}
