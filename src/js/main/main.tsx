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
        onClick={() => alert('Button clicked!')}
      >
        Click me
      </Button>
    </div>
  );
};

export default Main;
