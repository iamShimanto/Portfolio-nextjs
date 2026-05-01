import Jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
  return Jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
