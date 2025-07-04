import {
  deleteSaveMarkers,
  placeSaveMarkers,
  saveSubstrates,
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
    </>
  );
};

export default Component;
