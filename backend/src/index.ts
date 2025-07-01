import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import { CLIENT_URL, PORT } from "./constants/ENV.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { docsRouter } from "./routes/docs.route.js";
import { subjectRouter } from "./routes/subject.route.js";
import { communityRouter } from "./routes/community.route.js";
import { setResponse } from "./utils/jsonStander.js";
import { asyncWrapper } from "./utils/AsyncWrapper.js";

import "./config/PassportGoogleConfig.js";
import "./config/PassportMicrosoftConfig.js";

const allowedOrigins = CLIENT_URL || "http://localhost:3000";
const app = express();

app.use(helmet());
app.use(helmet.xssFilter()); // XSS filter
app.use(helmet.hidePoweredBy()); // Hide "X-Powered-By"
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      frameSrc: ["'none'"], // Disable iframes
    },
  })
);

app.use(passport.initialize());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true })); // Needed for form-data
app.use(express.json()); // Needed for JSON requests

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/docs", docsRouter);
app.use("/community", communityRouter);
app.use("/subject", subjectRouter);
app.use(
  "*",
  asyncWrapper((req: Request, res: Response) => {
    return setResponse(res, { data: null }, 404, "Route not found");
  })
);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
