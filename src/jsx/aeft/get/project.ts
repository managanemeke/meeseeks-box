import {
  BACKSLASH,
  SLASH,
} from "../../../shared/lib/config";
import {
  replaceAll,
} from "../../lib/base";

export const project = (): string => {
  const projectFile = app.project.file;
  if (projectFile) {
    return replaceAll(projectFile.parent.fsName, BACKSLASH, SLASH);
  }
  return "";
};
