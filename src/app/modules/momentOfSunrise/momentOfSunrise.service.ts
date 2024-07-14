import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import MomentOfSunrise from "./momentOfSunrise.model";
import { TMomentOfSunrise } from "./momentOfSunrise.types";

const createMomentOfSunriseIntoDB = async (
  payload: TMomentOfSunrise,
  file: any,
) => {
  if (file?.path) {
    const { secure_url } = await sendImageToCloudinary(file?.path);
    payload.image = secure_url;
  }

  const result = await MomentOfSunrise.create(payload);

  return result;
};

const getAllMomentOfSunriseFromDB = async () => {
  const result = await MomentOfSunrise.find();
  return result;
};

const updateMomentOfSunriseIntoDB = async (
  id: string,
  payload: Partial<TMomentOfSunrise>,
) => {
  const moment = await MomentOfSunrise.findById(id);
  if (!moment) {
    throw new Error("moment not found");
  }
  const result = await MomentOfSunrise.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteMomentOfSunriseFromDB = async (id: string) => {
  const moment = await MomentOfSunrise.findById(id);
  if (!moment) {
    throw new Error("moment not found");
  }
  const result = await MomentOfSunrise.findByIdAndDelete(id, { new: true });

  return result;
};

export const MomentOfSunriseServices = {
  createMomentOfSunriseIntoDB,
  getAllMomentOfSunriseFromDB,
  updateMomentOfSunriseIntoDB,
  deleteMomentOfSunriseFromDB,
};
