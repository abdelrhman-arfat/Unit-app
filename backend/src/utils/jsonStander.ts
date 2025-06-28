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
