import { Schema, model } from "mongoose";
import { TProgram } from "./program.types";

const programSchema = new Schema<TProgram>(
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

const Program = model("Program", programSchema);

export default Program;
