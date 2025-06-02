import _, {padStart} from "lodash";

import {
  test,
  notify,
  saveShrubs,
  saveSubstrates,
  placeSaveMarkers,
  deleteSaveMarkers,
  printLayersOfActiveComp,
} from "./shared/aeft";
import {
  getLabelNames,
  getLabelColors,
} from "../lib/utils/aeft";
import {ColorOption, ColorPicker, MainTabs} from "./components";

const Main = () => {
  const labels = (): Record<number, ColorOption> => {
    const names = getLabelNames();
    const colors = getLabelColors();
    const options: Record<number, ColorOption> = {};
    _.forEach(names, (value, key) => {
      options[Number(key)] = {
        color: "#" + colors[key],
        label: padStart(key, 2, "0") + ": " + value,
        value: key,
      };
    });
    return options;
  };
  const colorOptions = labels();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MainTabs />
      <button
        onClick={async (event) => {
          await test();
          await notify("test");
          event.currentTarget.innerText = "ready";
        }}
      >
        test
      </button>
      <button
        onClick={async (event) => {
          await printLayersOfActiveComp();
        }}
      >
        printLayersOfActiveComp
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
      <button
        onClick={async () => {
          await deleteSaveMarkers();
        }}
      >
        deleteSaveMarkers
      </button>
      <button
        onClick={async () => {
          await saveShrubs();
        }}
      >
        saveShrubs
      </button>
      <ColorPicker
        options={colorOptions}
      />
    </div>
  );
};

export default Main;
