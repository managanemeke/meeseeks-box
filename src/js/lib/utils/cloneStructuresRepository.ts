import {
  GLOBAL_STRUCTURES_DIRECTORY,
} from "../config/paths";
import {
  bunRun,
  degitGithubRepository,
  command,
  CommandResult,
  powershellCommand,
} from "./execute";

type CloneRepositoryResult = {
  directory: string,
  success: boolean,
  command: CommandResult,
};

export const cloneStructuresRepository = (
  directory: string = GLOBAL_STRUCTURES_DIRECTORY,
): CloneRepositoryResult => {
  const commandResult =
    command(
      powershellCommand(
        bunRun(
          degitGithubRepository({
            user: 'managanemeke',
            repository: 'meeseeks-box-structures',
            directory: directory,
          })
        )
      )
    );
  return {
    directory: directory,
    success: commandResult.success,
    command: commandResult
  };
};
