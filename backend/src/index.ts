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

import "./config/CloudinaryConfig.js";
import "./config/PassportGoogleConfig.js";
import "./config/PassportMicrosoftConfig.js";
import "./config/RedisConfig.js";
import { taskRouter } from "./routes/task.route.js";
import { eventRouter } from "./routes/event.route.js";
import { quizRouter } from "./routes/quiz.route.js";
import { connectRabbitMQ } from "./config/RabbitMQ.js";

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
app.use("/task", taskRouter);
app.use("/event", eventRouter);
app.use("/quiz", quizRouter);
app.use(
  "*",
  asyncWrapper((req: Request, res: Response) => {
    return setResponse(res, { data: null }, 404, "Route not found");
  })
);

app.listen(PORT, async () => {
  await connectRabbitMQ();
  console.log("server is running on port " + PORT);
});
