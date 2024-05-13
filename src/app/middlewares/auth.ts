import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { jwtHelpers } from "../../shared/jwtHelpers";
import AppError from "../errors/appError";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_access_serect as string
      );
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
