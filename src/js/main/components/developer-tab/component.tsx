import {
  notify,
  printLayersOfActiveComp,
  saveShrubs,
  test,
} from "../../shared/aeft";
import {
  cloneReonRepository,
  clearShrubsDirectory,
  cloneStructuresRepository,
} from "../../../lib/utils/aeft";

const Component = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
        onClick={async () => {
          await printLayersOfActiveComp();
        }}
      >
        printLayersOfActiveComp
      </button>
      <button
        onClick={async () => {
          await clearShrubsDirectory();
          await saveShrubs();
        }}
      >
        saveShrubs
      </button>
      <button
        onClick={async () => {
          const result = await cloneStructuresRepository();
          await notify(JSON.stringify(result, null, 2));
        }}
      >
        cloneStructuresRepository
      </button>
      <button
        onClick={async () => {
          const result = await cloneReonRepository();
          await notify(JSON.stringify(result, null, 2));
        }}
      >
        cloneReonRepository
      </button>
    </div>
  );
};

export default Component;
