import {
  BACKSLASH,
  APPLICATION_STRUCTURES_CSV as APPLICATION_STRUCTURES_CSV_FILE,
  PROJECT_REON_SHRUBS as PROJECT_REON_SHRUBS_DIRECTORY,
  MACHINE,
  PROJECT,
  SLASH,
} from "../../../shared/lib/config";
import {
  replaceAll,
} from "../base";
import {
  project as getProject,
} from "../../aeft/get/project";

const machine = ((): string => {
  return replaceAll(Folder.appData.fsName, BACKSLASH, SLASH);
})();
const project = getProject();

const prepare = (path: string) => {
  if (
    (
      path.indexOf(MACHINE) > -1
      && !machine
    ) || (
      path.indexOf(PROJECT) > -1
      && !project
    )
  ) {
    return "";
  }
  return path
    .replace(MACHINE, machine)
    .replace(PROJECT, project);
};

export const PROJECT_REON_SHRUBS = prepare(PROJECT_REON_SHRUBS_DIRECTORY);

export const APPLICATION_STRUCTURES_CSV = prepare(APPLICATION_STRUCTURES_CSV_FILE);
