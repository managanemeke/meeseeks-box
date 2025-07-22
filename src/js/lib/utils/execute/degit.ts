import {
  bunRun,
  CommandResult,
  degitGithubRepository,
  execute,
  powershellCommand,
} from "./index";

export type GithubRepositoryInstance = {
  user: string,
  repository: string,
  directory: string,
}

export type CloneRepositoryResult = {
  directory: string,
  success: boolean,
  command: CommandResult,
};

export const githubRepository = (
  instance: GithubRepositoryInstance,
): string => {
  const { user, repository, directory } = instance;
  return `degit --force ${user}/${repository} ${directory}`;
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
