import {
  GLOBAL_REON_DIRECTORY,
} from "../config/paths";
import {
  CloneRepositoryResult,
  degitCloneGithubRepository
} from "./execute";

export const cloneReonRepository = (
  directory: string = GLOBAL_REON_DIRECTORY,
): CloneRepositoryResult => {
  return degitCloneGithubRepository({
    user: 'managanemeke',
    repository: 'reon',
    directory: directory,
  });
};
