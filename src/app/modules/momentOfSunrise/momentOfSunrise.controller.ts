import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MomentOfSunriseServices } from "./momentOfSunrise.service";

const createMomentOfSunrise = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    // console.log({data})
    const result = await MomentOfSunriseServices.createMomentOfSunriseIntoDB(
      data,
      req?.file,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "moment successfully created",
      data: result,
    });
  },
);

const getAllMomentOfSunrise = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MomentOfSunriseServices.getAllMomentOfSunriseFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "successfully retrieved all moment",
      data: result,
    });
  },
);

const updateMomentOfSunrise = catchAsync(
  async (req: Request, res: Response) => {
    const { momentId } = req.params;
    const result = await MomentOfSunriseServices.updateMomentOfSunriseIntoDB(
      momentId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "moment updated successfully",
      data: result,
    });
  },
);

const deleteMomentOfSunrise = catchAsync(
  async (req: Request, res: Response) => {
    const { momentId } = req.params;
    const result =
      await MomentOfSunriseServices.deleteMomentOfSunriseFromDB(momentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "moment deleted successfully",
      data: result,
    });
  },
);

export const MomentOfSunriseController = {
  getAllMomentOfSunrise,
  createMomentOfSunrise,
  updateMomentOfSunrise,
  deleteMomentOfSunrise,
};
