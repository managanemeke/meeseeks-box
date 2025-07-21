import {
  os,
  path,
} from "../cep/node";

const GLOBAL_EXTENSION_DIRECTORY = path.join(
  os.homedir(),
  'AppData',
  'Roaming',
  'meeseeks-box',
);

export const GLOBAL_STRUCTURES_DIRECTORY = path.join(
  GLOBAL_EXTENSION_DIRECTORY,
  'structures',
);
