import { Schema, model } from "mongoose";
import { TUser } from "./user.types";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
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

userSchema.pre("save", async function (next) {
  const user = this;
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  user.password = hashedPassword;
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = model<TUser>("User", userSchema);

export default User;
