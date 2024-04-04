import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

//! parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello sunrise agency");
  } catch (error) {
    next(error);
  }
});

// ! router
app.use("/api/v1/", router);

// * not found route handler
app.all("*", notFound);

// ! global error handler
app.use(globalErrorHandler);

export default app;
