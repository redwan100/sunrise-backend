import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import News from "./news.model";
import { TNews } from "./news.types";

const createNewsIntoDB = async (payload: TNews, file: Record<string, any>) => {
  const imageName = payload.title;
  const { secure_url } = await sendImageToCloudinary(imageName, file?.path);
  payload.image = secure_url;

  const result = await News.create(payload);

  return result;
};

export const NewsServices = {
  createNewsIntoDB,
};
