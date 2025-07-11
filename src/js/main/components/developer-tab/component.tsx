import {
  notify,
  printLayersOfActiveComp,
  saveShrubs,
  test,
} from "../../shared/aeft";
import {ColorOption, ColorPicker} from "../index";
import {CirclePicker} from "react-color";
import {getLabelColors, getLabelNames} from "../../../lib/utils/aeft";
import _, {padStart} from "lodash";
import {Button} from "react-aria-components";

const Component = () => {
  const labels = (): Record<number, ColorOption> => {
    const names = getLabelNames();
    const colors = getLabelColors();
    const options: Record<number, ColorOption> = {};
    _.forEach(names, (value, key) => {
      options[Number(key)] = {
        color: colors[key],
        label: padStart(key, 2, "0") + ": " + value,
        value: key,
      };
    });
    return options;
  };
  const colors = _.values(getLabelColors());
  const colorOptions = labels();
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
      <ColorPicker
        options={colorOptions}
      />
      Layers with label
      <CirclePicker
        width={"180px"}
        color={colors[0]}
        colors={colors}
        onChangeComplete={(color) => alert(color.hex)}
      />
      <Button>
        Disable
      </Button>
      <Button>
        Enable
      </Button>
    </div>
  );
};

export default Component;
