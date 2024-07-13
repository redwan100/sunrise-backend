import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import HomeSlider from "./home.slider.model";

const createSlider = async (files: any) => {
  const images = [];

  for (const file of files) {
    const result = await sendImageToCloudinary(file.path);
    images.push(result?.secure_url);
  }

  const urls = await HomeSlider.insertMany(images.map((url) => ({ url })));

  return urls;
};

const getALLSlider = async () => {
  const result = await HomeSlider.find();
  return result;
};

const deleteSlider = async (id: string) => {
  return await HomeSlider.findByIdAndDelete(id);
};

export const HomeSliderService = {
  createSlider,
  getALLSlider,
  deleteSlider,
};
