import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const NODE_ENV = process.env.NODE_ENV as string;
export { PORT, JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV };
