import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import News from "./news.model";
import { TNews } from "./news.types";

const createNewsIntoDB = async (payload: TNews, path: string) => {
  const imageName = payload.title.split(" ").join("");
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  payload.image = secure_url;

  const result = await News.create(payload);

  return result;
};

export const NewsServices = {
  createNewsIntoDB,
};
