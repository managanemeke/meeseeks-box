import {evalES} from "../lib/utils/bolt";

/**
 * {@link src/jsx/aeft/test.ts}
 */
const test = async (): Promise<void> => {await evalES("test()")};

const Main = () => {
  return (
    <div>
      <button
        onClick={async (event) => {
          await test();
          event.currentTarget.innerText = "ready";
        }}
      >
        test
      </button>
    </div>
  );
};
export default Main;