import {
  deleteSaveMarkers,
  placeSaveMarkers,
  saveSubstrates,
  renameCompositions,
} from "../../shared/aeft";

const Component = () => {
  return (
    <>
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
    </>
  );
};

export default Component;
