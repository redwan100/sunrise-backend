import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    jwt_secret: process.env.JWT_ACCESS_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
  },
};
