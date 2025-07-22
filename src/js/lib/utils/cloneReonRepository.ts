import {
  usePaths,
} from "../config";
import {
  CloneRepositoryResult,
  degitCloneGithubRepository
} from "./execute";

export const cloneReonRepository = async (
  directory?: string,
): Promise<CloneRepositoryResult> => {
  const { PROJECT_REON, APPLICATION_REON } = await usePaths();
  if (
    !directory
    && PROJECT_REON
  ) {
    directory = PROJECT_REON;
  }
  if (
    !directory
    && !PROJECT_REON
    && APPLICATION_REON
  ) {
    directory = APPLICATION_REON;
  }
  if (!directory) {
    throw new Error("error");
  }
  return degitCloneGithubRepository({
    user: 'managanemeke',
    repository: 'reon',
    directory: directory,
  });
};
