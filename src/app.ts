import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
export const app: Application = express();

//! parser
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello sunrise agency");
});

