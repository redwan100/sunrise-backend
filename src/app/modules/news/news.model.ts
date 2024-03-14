import { Schema, model } from "mongoose";
import { TNews } from "./news.types";

const newsSchema = new Schema<TNews>(
  {
    title: {
      type: String,
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

const News = model("News", newsSchema);

export default News;
