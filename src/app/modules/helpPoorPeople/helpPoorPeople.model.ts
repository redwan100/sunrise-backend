import { Schema, model } from "mongoose";

const helpPoorPeopleSchema = new Schema({
  url: {
    type: String,
    require: true,
  },
});

const HelpPoorPeople = model("HelpPoorPeople", helpPoorPeopleSchema);

export default HelpPoorPeople;
