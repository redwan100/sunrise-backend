import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Admin from "../admin/admin.model";
import { TAdmin } from "../admin/admin.types";

const createAdminIntoDB = async (payload: TAdmin, file: any) => {
  if (await Admin.isUserExists(payload.id as string)) {
    throw new Error(`User ${payload.id} already exists`);
  }

  const { secure_url } = await sendImageToCloudinary(file?.path);
  payload.profileImage = secure_url;
  const result = await Admin.create(payload);

  return result;
};

export const UserService = {
  createAdminIntoDB,
};
