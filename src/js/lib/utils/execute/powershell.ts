export const command = (
  command: string
): string => {
  return `powershell -ExecutionPolicy Bypass -Command "${command}"`;
};
