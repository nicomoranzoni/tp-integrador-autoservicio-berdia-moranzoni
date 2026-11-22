import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PUERTO || 3000,
  session_key: process.env.SESSION_KEY,
  database: {
    host: process.env.BD_HOST,
    name: process.env.BD_NAME,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
  },
};
