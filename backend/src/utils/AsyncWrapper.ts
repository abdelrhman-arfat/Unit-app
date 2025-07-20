import { jsonStandard } from "./jsonStander.js";

export const asyncWrapper =
  (func: any) => async (req: any, res: any, next: any) => {
    try {
      await func(req, res, next);
    } catch (err) {
      const error = err as Error;
      console.log("error", error);
      const ErrorMessage = JSON.stringify(error.message);
      console.log("error message", ErrorMessage);
      return res
        .status(500)
        .json(jsonStandard(null, 500, "Internal Server Error", ErrorMessage));
    }
  };
