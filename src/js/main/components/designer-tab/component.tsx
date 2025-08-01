import {
  deleteSaveMarkers,
  placeSaveMarkers,
  saveSubstrates,
  renameCompositions,
  autoResizeCompositions,
  placeMeasureArea,
  resizeTextLayerToComposition,
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
          await renameCompositions();
        }}
      >
        renameCompositions
      </button>
      <button
        onClick={async () => {
          await autoResizeCompositions();
        }}
      >
        autoResizeCompositions
      </button>
      <button
        onClick={async () => {
          await placeMeasureArea();
        }}
      >
        placeMeasureArea
      </button>
      <button
        onClick={async () => {
          await resizeTextLayerToComposition();
        }}
      >
        resizeTextLayerToComposition
      </button>
      <VisibilityTool />
    </div>
  );
};

export default Component;
