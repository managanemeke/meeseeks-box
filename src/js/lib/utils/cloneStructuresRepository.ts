import {
  GLOBAL_STRUCTURES_DIRECTORY,
} from "../config/paths";
import {
  CloneRepositoryResult,
  degitCloneGithubRepository
} from "./execute";

export const cloneStructuresRepository = (
  directory: string = GLOBAL_STRUCTURES_DIRECTORY,
): CloneRepositoryResult => {
  return degitCloneGithubRepository({
    user: 'managanemeke',
    repository: 'meeseeks-box-structures',
    directory: directory,
  });
};
