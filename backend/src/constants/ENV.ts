import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const NODE_ENV = process.env.NODE_ENV as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_CLOUD_NAME as string;
export {
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  NODE_ENV,
  CLIENT_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
