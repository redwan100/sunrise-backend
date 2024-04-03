import Admin from "./admin.model";
import { TAdmin } from "./admin.types";

const getAllAdminFromDB = async () => {
  const result = await Admin.find().populate("user");
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate("user");

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await Admin.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const adminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
