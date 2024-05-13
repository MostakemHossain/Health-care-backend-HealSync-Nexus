import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

//parser
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "HealSync Nexus server.......",
  });
});
app.use("/api/v1", router);

//global Error Handler
app.use(globalErrorHandler);

//not Found route
app.use(notFound);

export default app;
