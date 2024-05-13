import jwt, { JwtPayload } from "jsonwebtoken";
const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
  return token;
};
const verifyToken = (token: string, serect: string) => {
  return jwt.verify(token, serect) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
