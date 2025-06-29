import { Response } from "express";
/**
 * @param data
 * @param status
 * @param message
 * @param error
 * @returns json with status , message , data and error
 */
export const jsonStandard = (
  data: any,
  status: number,
  message: string,
  error?: any
) => {
  return {
    data,
    status,
    message,
    error: error || null,
  };
};

export const setResponse = (
  res: Response,
  {
    data,
    pages = 1,
  }: {
    data: any;
    pages?: number;
  },
  status: number,
  message: string
): Response => {
  return res
    .status(status)
    .json(jsonStandard({ data: data, pages }, status, message));
};
