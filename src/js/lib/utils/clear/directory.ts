import {
  fs,
  path,
} from "../../cep/node";

export const directoryExclude = async (
  directory: string,
  exclude: Array<string> = [],
): Promise<void> => {
  const entries = await fs.promises.readdir(
    directory,
    { withFileTypes: true },
  );
  for (const entry of entries) {
    if (exclude.includes(entry.name)) {
      continue;
    }
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await fs.promises.rm(fullPath, { recursive: true, force: true });
    } else {
      await fs.promises.unlink(fullPath);
    }
  }
};
