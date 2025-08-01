import {
  evalES,
  evalTS,
} from "../../lib/utils/bolt";

export const test = async (): Promise<void> => {
  await evalES("test()");
};

export const printLayersOfActiveComp = async (): Promise<void> => {
  await evalES("printLayersOfActiveComp()");
};

export const notify = async (text: string): Promise<void> => {
  await evalTS("notify", text);
};

export const getProject = async (): Promise<string> => {
  return await evalTS("getProject");
};

export const placeSaveMarkers = async (): Promise<void> => {
  await evalES("placeSaveMarkers()");
};

export const saveSubstrates = async (): Promise<void> => {
  await evalES("saveSubstrates()");
};

export const deleteSaveMarkers = async (): Promise<void> => {
  await evalES("deleteSaveMarkers()");
};

export const renameCompositions = async (): Promise<void> => {
  await evalES("renameCompositions()");
};

export const autoResizeCompositions = async (): Promise<void> => {
  await evalES("autoResizeCompositions()");
};

export const placeMeasureArea = async (): Promise<void> => {
  await evalES("placeMeasureArea()");
};

export const saveShrubs = async (): Promise<void> => {
  await evalTS("saveShrubs");
};

export const resizeTextLayerToComposition = async (): Promise<void> => {
  await evalTS("resizeTextLayerToComposition");
};

export const setEnabledToAllLayersWithLabel = async (
  label: number,
  enabled: boolean,
): Promise<void> => {
  await evalES(`setEnabledToAllLayersWithLabel(${label}, ${enabled})`);
};
