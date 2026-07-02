import { AuthRepository } from "./auth.repository.js";
import type { RegisterInput } from "./auth.validation.js";
import { hashPassword } from "../../common/utils/bcrypt.js";
import type { AuthResponese } from "./auth.types.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.js";
import type { User } from "@prisma/client";

export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async register(data: RegisterInput): Promise<AuthResponese> {
    const existingUser = await this.authRepo.findByEmail(data.email);

    if (existingUser) throw new Error("Email already exists");

    const hashPass = await hashPassword(data.password);

    const newUser = await this.authRepo.create({
      name: data.name,
      email: data.email,
      password: hashPass,
    });

    return this.generateAuthResponse(newUser);
  }

  private async generateAuthResponse(user: User): Promise<AuthResponese> {
    const accessToken = generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const hashRefreshToken = await hashPassword(refreshToken);

    await this.authRepo.updateRefreshToken(user.id, hashRefreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}
