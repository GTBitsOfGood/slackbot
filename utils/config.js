import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

export default {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  api: {}
};
