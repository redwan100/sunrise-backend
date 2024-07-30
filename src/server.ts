import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // await mongoose.connect(config.database_url as string);
    await mongoose.connect("mongodb://localhost:27017/sunrise");
    app.listen(config.port, () => {
      console.log(`sunrise app listening on port ${config.port}✅`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
