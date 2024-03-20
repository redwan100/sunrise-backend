import config from "../../config";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Admin from "../admin/admin.model";
import { TAdmin } from "../admin/admin.types";
import User from "./user.model";
import { TNewUser, TUser } from "./user.types";

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

  userData.password = password || (config.default_password as string);
  userData.role = "admin";
  userData.id = "2024001";
  const { secure_url } = await sendImageToCloudinary(file?.path);
  adminData.profileImage = secure_url;

  // create user
  const newUser = await User.create(userData);

  if (Object.keys(adminData).length) {
    adminData.id = newUser.id;
    adminData.user = newUser._id;

    const newAdmin = await Admin.create(adminData);

    return newAdmin;
  }
};

export const UserService = {
  createAdminIntoDB,
};
