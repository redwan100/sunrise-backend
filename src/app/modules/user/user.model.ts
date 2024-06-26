import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.types";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await User.findOne({ email });

  return existingUser;
};

userSchema.pre("save", async function (next) {
  const user = this;
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  user.password = hashedPassword;
  next();
});

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = model<TUser, UserModel>("User", userSchema);

export default User;
