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
          const names = getLabelNames();
          const colors = getLabelColors();
          for (let index = 1; index <= 1; index++) {
            alert(names[index]);
            alert(colors[index]);
          }
        }}
      >
        Show first label
      </Button>
    </div>
  );
};

export default Main;
