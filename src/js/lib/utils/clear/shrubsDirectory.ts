import {
  usePaths,
} from "../../config";
import {
  directoryExclude as clearDirectoryExclude,
} from "./directory";

export const shrubsDirectory = async (): Promise<void> => {
  const { PROJECT_REON_SHRUBS } = await usePaths();
  await clearDirectoryExclude(PROJECT_REON_SHRUBS, [".gitignore", "template"]);
};
