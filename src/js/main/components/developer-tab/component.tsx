import {
  notify,
  printLayersOfActiveComp,
  saveShrubs,
  test,
} from "../../shared/aeft";
import {VisibilityTool} from "../index";

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
          await saveShrubs();
        }}
      >
        saveShrubs
      </button>
      <VisibilityTool />
    </div>
  );
};

export default Component;
