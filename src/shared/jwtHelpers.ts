import jwt from "jsonwebtoken";
const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
  return token;
};

export const jwtHelpers = {
  generateToken,
};
