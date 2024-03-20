import { Schema, model } from "mongoose";
import { AdminModel, TAdmin } from "./admin.types";

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    password: {
      type: String,
    },
    id: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

adminSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });

  return existingUser;
};

adminSchema.pre("find", function (next) {
  this.find({
    isDeleted: {
      $ne: true,
    },
  });

  next();
});

adminSchema.pre("findOne", function (next) {
  this.find({
    isDeleted: {
      $ne: true,
    },
  });

  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: {
        $ne: true,
      },
    },
  });

  next();
});

const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
