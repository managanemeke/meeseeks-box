import { Button } from '@swc-react/button';

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
import {ColorField} from "@swc-react/color-field";
import {ColorHandle} from "@swc-react/color-handle";

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
        onClick={async () => {
          for (let index = 1; index <= 1; index++) {
            alert(names[index]);
            alert(colors[index]);
          }
        }}
      >
        Show first label
      </Button>
      <ColorField
        viewColor={true}
        value={"#" + colors[1]}
      >
        <ColorHandle></ColorHandle>
      </ColorField>
    </div>
  );
};

export default Main;
