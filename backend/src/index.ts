import express, { Request, Response } from "express";
import { PORT } from "./constants/ENV.js";

const app = express();

app.get("/", (req: Request, response: Response) => {
  response.send("hello world");
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
