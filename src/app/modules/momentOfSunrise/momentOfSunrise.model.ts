import { Schema, model } from "mongoose";
import { TMomentOfSunrise } from "./momentOfSunrise.types";

const momentOfSunriseSchema = new Schema<TMomentOfSunrise>(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const MomentOfSunrise = model("MomentOfSunrise", momentOfSunriseSchema);

export default MomentOfSunrise;
