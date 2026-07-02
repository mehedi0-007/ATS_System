import bcrypt from "bcrypt";

const salt_rounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt_rounds);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};
