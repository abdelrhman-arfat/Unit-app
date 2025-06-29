export const checkIfInEnum = (value: string, enumType: any, fieldName: string) => {
  if (!Object.values(enumType).includes(value as any)) {
    throw new Error(`${fieldName} not in ${fieldName}s`);
  }
};