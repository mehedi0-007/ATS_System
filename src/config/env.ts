import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const getEnv = (key: string): string => {
  const data = process.env[key];

  if (!data) throw new Error(`Missing ${key} environment variable`);

  return data;
};

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRE: getEnv("JWT_ACCESS_EXPIRE") as StringValue,
  JWT_REFRESH_EXPIRE: getEnv("JWT_REFRESH_EXPIRE") as StringValue,
};
