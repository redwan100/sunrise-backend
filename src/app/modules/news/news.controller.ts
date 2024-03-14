import { NextFunction, Request, Response } from "express";
import { NewsServices } from "./news.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const path = req?.file?.path;
    const result = await NewsServices.createNewsIntoDB(data, path);

    res.status(200).json({
      success: true,
      message: "news successfully created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const NewsController = {
  createPost,
};
