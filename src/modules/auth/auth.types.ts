import { UserRole } from "@prisma/client";

export interface jwtPayload {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponese {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };

  accessToken: string;
  refreshToken: string;
}
