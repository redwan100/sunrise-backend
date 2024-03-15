import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsServices } from "./news.service";

const createPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await NewsServices.createNewsIntoDB(data, req?.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "news successfully created",
    data: result,
  });
});

const getAllNews = catchAsync(async (req, res, next) => {
  const result = await NewsServices.getAllNewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieved all news",
    data: result,
  });
});

const updateNews = catchAsync(async (req, res, next) => {
  const { newsId } = req.params;
  const result = await NewsServices.updateNewsIntoDB(newsId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "news updated successfully",
    data: result,
  });
});

export const NewsController = {
  createPost,
  getAllNews,
  updateNews,
};
