import {
  child_process,
} from "../../cep/node";

export type CommandResult = {
  command: string,
  success: boolean,
  result: string,
};

export { run as bunRun } from "./bun";
export { command as powershellCommand } from "./powershell";
export { githubRepository as degitGithubRepository } from "./degit";

export const execute = (command: string): CommandResult => {
  const result = {
    command: command,
    success: false,
    result: "",
  };
  try {
    result.result = child_process.execSync(command, {
      stdio: 'pipe',
      cwd: process.cwd(),
      encoding: 'utf-8',
    });
    result.success = true;
  } catch (error) {
    /* @ts-ignore */
    result.result = error.stderr ? error.stderr.toString() : error.message;
  }
  return result;
};
