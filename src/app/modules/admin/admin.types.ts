import { Model } from "mongoose";

export type TAdmin = {
  password?: string;
  id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  address: string;
  profileImage?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin>;
}
