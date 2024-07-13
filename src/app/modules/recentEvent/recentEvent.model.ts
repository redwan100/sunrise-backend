import { Schema, model } from "mongoose";

const recentEventSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
});

const RecentEvent = model("RecentEvent", recentEventSchema);

export default RecentEvent;
