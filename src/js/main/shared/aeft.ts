import {evalES} from "../../lib/utils/bolt";

export const test = async (): Promise<void> => {await evalES("test()")};

export const notify = async (text: string): Promise<void> => {await evalES(`notify("${text}")`)};

export const placeSaveMarkers = async (): Promise<void> => {await evalES("placeSaveMarkers()")};

export const saveSubstrates = async (): Promise<void> => {await evalES("saveSubstrates()")};

export const deleteSaveMarkers = async (): Promise<void> => {await evalES("deleteSaveMarkers()")};
