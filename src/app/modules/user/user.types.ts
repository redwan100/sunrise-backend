import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// export type TUser = {
//   id: string;
//   password: string;
//   email: string;
//   needPasswordChange: boolean;
//   status: "in-progress" | "blocked";
//   role: TUserRole;
//   isDelete: boolean;
// };

export interface TUser {
  id: string;
  password: string;
  email: string;
  needPasswordChange: boolean;
  status: "in-progress" | "blocked";
  role: "user" | "admin" | "super-admin";
  isDelete: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
