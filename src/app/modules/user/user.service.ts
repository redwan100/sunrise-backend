import mongoose from "mongoose";
import config from "../../config";
import generateAdminId from "../../utils/generateId";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import Admin from "../admin/admin.model";
import { TAdmin } from "../admin/admin.types";
import People from "../people/people.model";
import { TPeople } from "../people/people.types";
import User from "./user.model";
import { TUser } from "./user.types";

const createAdminIntoDB = async (
  password: string,
  adminData: TAdmin,
  file: unknown,
) => {
  const userData: Partial<TUser> = {};

  // * INITIALIZE SESSION
  const session = await mongoose.startSession();
  try {
    // * START TRANSACTION
    await session.startTransaction();

    // * GENERATE CUSTOM ID
    const adminId = await generateAdminId();

    userData.password = password || (config.default_password as string);

    userData.role = "admin";
    userData.id = adminId;

    if (file) {
      const { secure_url } = await sendImageToCloudinary(file?.path);
      adminData.profileImage = secure_url;
    }
    // create user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error("failed to create user");
    }

    adminData.id = adminId;
    adminData.user = newUser[0]._id;

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new Error("failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createPeopleIntoDB = async (
  password: string,
  peopleData: TPeople,
  file: unknown,
) => {
  const userData: Partial<TUser> = {};

  // * INITIALIZE SESSION
  const session = await mongoose.startSession();
  try {
    // * START TRANSACTION
    await session.startTransaction();

    // // * GENERATE CUSTOM ID
    // const adminId = await generateAdminId();

    userData.password = password || (config.default_password as string);

    userData.role = "user";
    // userData.id = adminId;

    if (file) {
      const { secure_url } = await sendImageToCloudinary(file?.path);
      peopleData.profileImage = secure_url;
    }
    // create user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error("failed to create user");
    }

    // peopleData.id = adminId;
    peopleData.user = newUser[0]._id;

    const user = await People.create([peopleData], { session });

    if (!user.length) {
      throw new Error("failed to create people");
    }

    await session.commitTransaction();
    await session.endSession();
    return user;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserService = {
  createAdminIntoDB,
  createPeopleIntoDB,
};
