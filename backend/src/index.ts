import express, { Request, Response } from "express";
import { PORT } from "./constants/ENV.js";

const app = express();

app.get("/", (req: Request, response: Response) => {
  console.log("red ip:", req.ip);
  console.log("send yes i am here");
  response.send("hello world From new update");
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
