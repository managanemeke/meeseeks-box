import {evalES} from "../../lib/utils/bolt";

/**
 * {@link src/jsx/aeft/test.ts}
 */
export const test = async (): Promise<void> => {await evalES("test()")};

/**
 * {@link src/jsx/aeft/placeSaveMarkers.ts}
 */
export const placeSaveMarkers = async (): Promise<void> => {await evalES("placeSaveMarkers()")};

/**
 * {@link src/jsx/aeft/saveSubstrates.ts}
 */
export const saveSubstrates = async (): Promise<void> => {await evalES("saveSubstrates()")};

/**
 * {@link src/jsx/aeft/deleteSaveMarkers.ts}
 */
export const deleteSaveMarkers = async (): Promise<void> => {await evalES("deleteSaveMarkers()")};
