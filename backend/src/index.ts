import express, { Request, Response } from "express";
import { CLIENT_URL, PORT } from "./constants/ENV.js";
import { router as authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
const allowedOrigins = CLIENT_URL || "http://localhost:3000";
const app = express();

/**
 * @name Middlewares config for security
 */

// Convert from http --> https for security | using nginx with let's encrypt to certificate of encryption requests
// app.use(
//   helmet.hsts({
//     maxAge: 63072000,
//     includeSubDomains: true,
//     preload: true,
//   })
// );
app.use(helmet());
app.use(helmet.xssFilter()); // XSS Filter for xss attacks
app.use(helmet.hidePoweredBy()); // Hide the powered by header to
app.use(cors({ origin: allowedOrigins, credentials: true })); // Allow cross origin
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      frameSrc: ["'none'"], // Disable iframe for the website
      // defaultSrc: ["'self'"],
      // scriptSrc: ["'self'", "trusted.cdn.com"], // CDN URL for scripts
      // styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
      // imgSrc: ["'self'", "data:", "trusted-images.com"], // Allow trusted images
      // connectSrc: ["'self'", "api.trusted.com"], // Allow trusted APIs
    },
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

try {
  app.use("/auth", authRouter);

  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
} catch (err) {
  console.log(err);
}
