export default {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  api: {
    "start-meeting": "/api/admin/start",
    "end-meeting": "/api/admin/end",
    "register": "/api/user/register",
    "checkin": "/api/user/checkin"
  }
};
