import { Schema, model } from "mongoose";

const homeSliderSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
});

const HomeSlider = model("HomeSlider", homeSliderSchema);

export default HomeSlider;
