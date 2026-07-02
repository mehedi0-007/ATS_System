import jwt from "jsonwebtoken";
import { type jwtPayload } from "../../modules/auth/auth.types.js";
import { env } from "../../config/env.js";
import type { StringValue } from "ms";

export const generateAccessToken = (payload: jwtPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRE as StringValue,
  });
};

export const generateRefreshToken = (payload: jwtPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRE,
  });
};

export const verifyAccessToken = (token: string): jwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as jwtPayload;
};

export const verifyRefreshToken = (token: string): jwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as jwtPayload;
};
