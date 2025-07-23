import {
  APPLICATION_STRUCTURES,
  APPLICATION_REON,
  PROJECT_STRUCTURES,
  PROJECT_REON,
  PROJECT_REON_SHRUBS,
  BACKSLASH,
  MACHINE,
  SLASH,
  PROJECT,
} from "../../../shared/lib/config";
import {
  execute,
  powershellCommand,
} from "../utils/execute";
import {
  getProject,
} from "../../main/shared/aeft";

export const usePaths = async () => {
  const platform = process.platform;
  const programData: string | null = (() => {
    try {
      const result = execute(
        powershellCommand(
          `echo "$env:PROGRAMDATA"`
        )
      );
      if (
        result.success
        && result.result !== ""
      ) {
        return result.result;
      }
    } catch (error) {
    }
    return null;
  })();

  const machine = ((): string => {
    if (
      platform === "win32"
      && programData
    ) {
      return programData.replaceAll(BACKSLASH, SLASH);
    }
    return "/opt";
  })();
  const project = await getProject();

  const prepare = (path: string) => {
    if (
      (
        path.includes(MACHINE)
        && !machine
      ) || (
        path.includes(PROJECT)
        && !project
      )
    ) {
      return "";
    }
    return path
      .replace(MACHINE, machine)
      .replace(PROJECT, project);
  };

  return {
    APPLICATION_STRUCTURES: prepare(APPLICATION_STRUCTURES),
    APPLICATION_REON: prepare(APPLICATION_REON),
    PROJECT_STRUCTURES: prepare(PROJECT_STRUCTURES),
    PROJECT_REON: prepare(PROJECT_REON),
    PROJECT_REON_SHRUBS: prepare(PROJECT_REON_SHRUBS),
  };
};
