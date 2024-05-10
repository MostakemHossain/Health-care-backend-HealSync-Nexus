import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
const app: Application = express();

//parser
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

export default app;
