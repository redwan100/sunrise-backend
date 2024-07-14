import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import HelpPoorPeople from "./helpPoorPeople.model";

const createHelpPoorPeople = async (files: any) => {
  const images = [];

  for (const file of files) {
    const result = await sendImageToCloudinary(file.path);
    images.push(result?.secure_url);
  }

  const urls = await HelpPoorPeople.insertMany(images.map((url) => ({ url })));

  return urls;
};

const getAllHelpPoorPeople = async () => {
  const result = await HelpPoorPeople.find();
  return result;
};

const deleteHelpPoorPeople = async (id: string) => {
  return await HelpPoorPeople.findByIdAndDelete(id);
};

export const HelpPoorPeopleService = {
  createHelpPoorPeople,
  getAllHelpPoorPeople,
  deleteHelpPoorPeople,
};
