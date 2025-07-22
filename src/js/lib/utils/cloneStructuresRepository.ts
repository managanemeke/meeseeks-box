import {
  usePaths
} from "../config";
import {
  CloneRepositoryResult,
  degitCloneGithubRepository
} from "./execute";

export const cloneStructuresRepository = async (
  directory?: string,
): Promise<CloneRepositoryResult> => {
  const { PROJECT_STRUCTURES, APPLICATION_STRUCTURES } = await usePaths();
  if (
    !directory
    && PROJECT_STRUCTURES
  ) {
    directory = PROJECT_STRUCTURES;
  }
  if (
    !directory
    && !PROJECT_STRUCTURES
    && APPLICATION_STRUCTURES
  ) {
    directory = APPLICATION_STRUCTURES;
  }
  alert(directory);
  if (!directory) {
    throw new Error("error");
  }
  return degitCloneGithubRepository({
    user: 'managanemeke',
    repository: 'meeseeks-box-structures',
    directory: directory,
  });
};
