import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProgramService } from "./program.service";

const createProgram = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ProgramService.createProgramIntoDB(data, req?.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "program successfully created",
    data: result,
  });
});

const getAllProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await ProgramService.getAllProgramFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully retrieved all programs",
    data: result,
  });
});

const getSingleProgram = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProgramService.getSingleProgramFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully retrieved program",
    data: result,
  });
});

const updateProgram = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProgramService.updateProgramIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully update program",
    data: result,
  });
});
const deleteProgram = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProgramService.deleteProgramIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " successfully deleted program",
    data: result,
  });
});

export const ProgramController = {
  createProgram,
  getAllProgram,
  getSingleProgram,
  updateProgram,
  deleteProgram,
};
