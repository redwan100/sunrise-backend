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

export const HomeSliderService = {
  createSlider,
};
