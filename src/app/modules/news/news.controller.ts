import { NextFunction, Request, Response } from "express";
import { NewsServices } from "./news.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const file = req?.file;
    const result = await NewsServices.createNewsIntoDB(data, file);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
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
