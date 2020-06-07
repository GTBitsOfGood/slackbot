import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

export default {
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/bog-bot",
  dbName: process.env.DB_NAME || "bog-bot",
  api: {}
};
