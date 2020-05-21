import mongoose from "mongoose";
import config from "utils/config";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(config.dbUrl, {
      dbName: config.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch(error => {
      console.error("Database connection failed. ↓");
      console.error(" > " + error);
      throw error;
    });
};
