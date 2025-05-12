import {
  aeftLayersFromComp,
  getActiveComp,
  notify,
} from "./aeft-utils";

export const printLayersOfActiveComp = () => {
  const comp = getActiveComp();
  notify(JSON.stringify(aeftLayersFromComp(comp)));
};
