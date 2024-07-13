import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import RecentEvent from "./recentEvent.model";

const createRecentEvent = async (files: any) => {
  const images = [];

  for (const file of files) {
    const result = await sendImageToCloudinary(file.path);
    images.push(result?.secure_url);
  }

  const urls = await RecentEvent.insertMany(images.map((url) => ({ url })));

  return urls;
};

const getALLRecentEvent = async () => {
  const result = await RecentEvent.find();
  return result;
};

const deleteRecentEvent = async (id: string) => {
  return await RecentEvent.findByIdAndDelete(id);
};

export const RecentEventService = {
  createRecentEvent,
  getALLRecentEvent,
  deleteRecentEvent,
};
