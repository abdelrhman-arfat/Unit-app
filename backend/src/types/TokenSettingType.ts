export type TokenSettingType = (maxAge: number) => {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none";
  maxAge: number;
};
