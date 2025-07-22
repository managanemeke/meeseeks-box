import {
  bunRun,
  CommandResult,
  degitGithubRepository,
  execute,
  GithubRepositoryInstance,
  powershellCommand,
} from "./index";

export type CloneRepositoryResult = {
  directory: string,
  success: boolean,
  command: CommandResult,
};

export const cloneGithubRepository = (
  instance: GithubRepositoryInstance,
): CloneRepositoryResult => {
  const commandResult =
    execute(
      powershellCommand(
        bunRun(
          degitGithubRepository(
            instance
          )
        )
      )
    );
  return {
    directory: instance.directory,
    success: commandResult.success,
    command: commandResult,
  };
};