import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsServices } from "./news.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // console.log({data})
  const result = await NewsServices.createNewsIntoDB(data, req?.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "news successfully created",
    data: result,
  });
});

const getAllNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsServices.getAllNewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved all news",
    data: result,
  });
});
const getSingleNews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsServices.getSingleNewsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved news",
    data: result,
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  const { newsId } = req.params;
  const result = await NewsServices.updateNewsIntoDB(newsId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "news updated successfully",
    data: result,
  });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsServices.deleteNewsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "news deleted successfully",
    data: result,
  });
});

export const NewsController = {
  createPost,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
};
