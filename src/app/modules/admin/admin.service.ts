import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Admin from "./admin.model";
import { TAdmin } from "./admin.types";

const createAdminIntoDB = async (payload: TAdmin, file: any) => {
  if (await Admin.isUserExists(payload.id)) {
    throw new Error(`User ${payload.id} already exists`);
  }

  const { secure_url } = await sendImageToCloudinary(file?.path);
  payload.profileImage = secure_url;
  const result = await Admin.create(payload);

  return result;
};

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await Admin.findByIdAndUpdate(
    id,
    { isDeleted: true, isActive: "blocked" },
    { new: true },
  );
  return result;
};

export const adminService = {
  createAdminIntoDB,
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
