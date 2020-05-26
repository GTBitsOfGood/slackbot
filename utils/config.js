export default {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  api: {
    "start-meeting": "/api/admin/start-meeting",
    "end-meeting": "/api/admin/end-meeting",
    "register": "/api/user/register",
    "checkin": "/api/user/checkin"
  }
};
