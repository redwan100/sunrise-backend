import { Types } from "mongoose";

export type TPeople = {
  password?: string;
  id?: string;
  user: Types.ObjectId;
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
  isDeleted: boolean;
};

// export interface PeopleModel extends Model<TPeople> {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<TPeople>;
// }
