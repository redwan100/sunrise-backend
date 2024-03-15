import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import News from "./news.model";
import { TNews } from "./news.types";

const createNewsIntoDB = async (payload: TNews, file: any) => {
  const imageName = payload.title;
  const { secure_url } = await sendImageToCloudinary(imageName, file?.path);
  payload.image = secure_url;

  const result = await News.create(payload);

  return result;
};

const getAllNewsFromDB = async () => {
  const result = await News.find();
  return result;
};

const updateNewsIntoDB = async (id: string, payload: Partial<TNews>) => {
  const news = await News.findById(id);
  if (!news) {
    throw new Error("News not found");
  }
  const result = await News.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const NewsServices = {
  createNewsIntoDB,
  getAllNewsFromDB,
  updateNewsIntoDB,
};
