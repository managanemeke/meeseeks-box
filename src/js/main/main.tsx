import {evalES} from "../lib/utils/bolt";

/**
 * {@link src/jsx/aeft/test.ts}
 */
const test = async (): Promise<void> => {await evalES("test()")};

/**
 * {@link src/jsx/aeft/placeSaveMarkers.ts}
 */
const placeSaveMarkers = async (): Promise<void> => {await evalES("placeSaveMarkers()")};

/**
 * {@link src/jsx/aeft/saveSubstrates.ts}
 */
const saveSubstrates = async (): Promise<void> => {await evalES("saveSubstrates()")};

const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={async (event) => {
          await test();
          event.currentTarget.innerText = "ready";
        }}
      >
        test
      </button>
      <button
        onClick={async () => {
          await placeSaveMarkers();
        }}
      >
        placeSaveMarkers
      </button>
      <button
        onClick={async () => {
          await saveSubstrates();
        }}
      >
        saveSubstrates
      </button>
    </div>
  );
};
export default Main;