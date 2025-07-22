import {
  BACKSLASH,
  APPLICATION_STRUCTURES_CSV as APPLICATION_STRUCTURES_CSV_FILE,
  MACHINE,
  PROJECT,
  SLASH,
} from "../../../shared/lib/config";
import {
  replaceAll,
} from "../base";
import {
  getProject,
} from "../../aeft/aeft";

const machine = ((): string => {
  return replaceAll(Folder.appData.fsName, BACKSLASH, SLASH);
})();
const project = getProject();

const prepare = (path: string) => {
  return path
    .replace(MACHINE, machine)
    .replace(PROJECT, project);
};

export const APPLICATION_STRUCTURES_CSV = prepare(APPLICATION_STRUCTURES_CSV_FILE);
