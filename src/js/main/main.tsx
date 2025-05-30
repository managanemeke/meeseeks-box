import {Button, ColorField, ColorSwatch} from '@adobe/react-spectrum';

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
import {ColorPicker, MainTabs} from "./components";

const Main = () => {
  const names = getLabelNames();
  const colors = getLabelColors();
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
      <Button
        variant={"primary"}
        onPress={async () => {
          const labels = {};
          for (let index = 1; index <= 1; index++) {
            alert(names[index]);
            alert(colors[index]);
          }
        }}
      >
        Show first label
      </Button>
      <ColorField
        value={"#" + colors[1]}
      />
      <ColorSwatch
        color={"#" + colors[1]}
      />
      <ColorPicker />
    </div>
  );
};

export default Main;
