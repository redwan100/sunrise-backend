import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Program from "./program.model";
import { TProgram } from "./program.types";

const createProgramIntoDB = async (payload: TProgram, file: string) => {
  if (file) {
    const { secure_url } = await sendImageToCloudinary(file.path);
    payload.image = secure_url;
  }

  const result = await Program.create(payload);

  return result;
};
const getAllProgramFromDB = async (): Promise<TProgram[] | []> => {
  const result = await Program.find();
  return result;
};

const getSingleProgramFromDB = async (id: string): Promise<TProgram> => {
  const result = await Program.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "program data not found");
  }

  return result;
};

const updateProgramIntoDB = async (
  id: string,
  payload: Partial<TProgram>,
): Promise<TProgram | null> => {
  const program = await Program.findById(id);
  if (!program) {
    throw new AppError(httpStatus.NOT_FOUND, "Program not found");
  }

  const result = await Program.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
const deleteProgramIntoDB = async (id: string) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new AppError(httpStatus.NOT_FOUND, "Program not found");
  }

  const result = await Program.deleteOne({ _id: id });

  return result;
};

export const ProgramService = {
  createProgramIntoDB,
  getAllProgramFromDB,
  getSingleProgramFromDB,
  updateProgramIntoDB,
  deleteProgramIntoDB,
};
