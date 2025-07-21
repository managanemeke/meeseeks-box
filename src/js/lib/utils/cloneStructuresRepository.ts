import {
  GLOBAL_STRUCTURES_DIRECTORY,
} from "../config/paths";
import {
  command,
  CommandResult,
  powershellCommand,
} from "./execute";

type CloneRepositoryResult = {
  directory: string,
  success: boolean,
  command: CommandResult,
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

export const cloneStructuresRepository = (
  directory: string = GLOBAL_STRUCTURES_DIRECTORY,
): CloneRepositoryResult => {
  const commandResult =
    command(
      powershellCommand(
        cloneGithubRepositoryCommand({
          user: 'managanemeke',
          repository: 'meeseeks-box-structures',
          directory: directory,
        })
      )
    );
  return {
    directory: directory,
    success: commandResult.success,
    command: commandResult
  };
};
