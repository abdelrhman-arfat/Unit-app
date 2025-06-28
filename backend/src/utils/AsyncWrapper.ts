import { jsonStandard } from "./jsonStander.js";

export const asyncWrapper =
  (func: any) => async (req: any, res: any, next: any) => {
    try {
      await func(req, res, next);
    } catch (err) {
      const error = err as Error;
      res
        .status(500)
        .json(jsonStandard(null, 500, "Internal Server Error", error.message));
    }
  };
