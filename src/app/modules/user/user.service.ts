import config from "../../config";
import generateAdminId from "../../utils/generateId";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Admin from "../admin/admin.model";
import { TAdmin } from "../admin/admin.types";
import User from "./user.model";
import { TUser } from "./user.types";

const createAdminIntoDB = async (
  password: string,
  adminData: TAdmin,
  file: any,
) => {
  // if (await Admin.isUserExists(payload.id as string)) {
  //   throw new Error(`User ${payload.id} already exists`);
  // }

  // create user
  const userData: Partial<TUser> = {};
  const adminId = await generateAdminId();

  userData.password = password || (config.default_password as string);
  userData.role = "admin";
  userData.id = adminId;
  const { secure_url } = await sendImageToCloudinary(file?.path);
  adminData.profileImage = secure_url;

  // create user
  const newUser = await User.create(userData);
  if (Object.keys(adminData).length) {
    adminData.id = adminId;
    adminData.user = newUser._id;

    const newAdmin = await Admin.create(adminData);

    return newAdmin;
  }
};

export const UserService = {
  createAdminIntoDB,
};
