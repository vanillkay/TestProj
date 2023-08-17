export const setIfTrue = <T = unknown>(condition: boolean, value: T) =>
  condition ? value : undefined;
