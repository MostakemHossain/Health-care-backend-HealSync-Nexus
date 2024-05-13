import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.port,
  jwt: {
    jwt_access_serect: process.env.JWT_ACCESS_SERECT,
    jwt_access_serect_exipres_in: process.env.JWT_ACCESS_SERECT_EXIPRES_IN,
    jwt_refresh_serect: process.env.JWT_REFRESH_SERECT,
    jwt_refresh_serect_exipres_in: process.env.JWT_REFRESH_SERECT_EXIPRES_IN,
  },
};
