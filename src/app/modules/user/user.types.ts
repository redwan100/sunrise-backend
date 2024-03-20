export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  status: "in-progress" | "blocked";
  role: "user" | "admin" | "super-admin";
  isDelete: boolean;
};
