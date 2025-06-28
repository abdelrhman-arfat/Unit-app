import express, { Request, Response } from "express";
import { PORT } from "./constants/ENV.js";
import { router as authRouter } from "./routes/auth.route.js";
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true })); //
try {
  app.get("/", (req: Request, response: Response) => {
    response.json({
      message: "Hello World",
    });
  });

  app.use("/auth", authRouter);

  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
} catch (err) {
  console.log(err);
}
