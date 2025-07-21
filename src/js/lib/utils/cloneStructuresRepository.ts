import {
  child_process,
  os,
  path,
} from "../cep/node";
import { GLOBAL_STRUCTURES_DIRECTORY } from "../config/paths";

type CloneRepositoryResult = {
  directory: string,
  success: boolean,
  command: ExecuteCommandResult,
};

type ExecuteCommandResult = {
  command: string,
  success: boolean,
  result: string,
};

type GithubRepositoryInstance = {
  user: string,
  repository: string,
  directory: string,
}

const cloneGithubRepositoryCommand = (instance: GithubRepositoryInstance): string => {
  const { user, repository, directory } = instance;
  return `bun run degit --force ${user}/${repository} ${directory}`;
};

const powershellCommand = (command: string): string => {
  return `powershell -ExecutionPolicy Bypass -Command "${command}"`;
};

const executeCommand = (command: string): ExecuteCommandResult => {
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

export const cloneStructuresRepository = (
  directory: string = GLOBAL_STRUCTURES_DIRECTORY,
): CloneRepositoryResult => {
  const command = powershellCommand(
    cloneGithubRepositoryCommand({
      user: 'managanemeke',
      repository: 'meeseeks-box-structures',
      directory: directory,
    })
  );
  const executeCommandResult = executeCommand(command);
  return {
    directory: directory,
    success: executeCommandResult.success,
    command: executeCommandResult
  };
};
