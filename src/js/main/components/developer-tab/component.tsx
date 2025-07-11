import {
  notify,
  printLayersOfActiveComp,
  saveShrubs,
  test,
} from "../../shared/aeft";
import {ColorOption} from "../index";
import {CirclePicker, ColorResult} from "react-color";
import {getLabelColors, getLabelNames} from "../../../lib/utils/aeft";
import _, {padStart} from "lodash";
import {Button} from "react-aria-components";
import {useState} from "react";

const Component = () => {
  const labels = (): Record<string, ColorOption> => {
    const names = getLabelNames();
    const colors = getLabelColors();
    const options: Record<string, ColorOption> = {};
    _.forEach(names, (value, key) => {
      let hex = colors[key];
      options[hex] = {
        color: hex,
        label: padStart(key, 2, "0") + ": " + value,
        value: Number(key),
      };
    });
    return options;
  };
  const colors = _.values(getLabelColors());
  const colorOptions = labels();
  const firstColor = colors[0];
  const [selectedColor, setSelectedColor] = useState<string>(firstColor);
  const [selectedColorValue, setSelectedColorValue] = useState<number>(colorOptions[firstColor].value);
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
      Layers with label
      <CirclePicker
        width={"180px"}
        color={selectedColor}
        colors={colors}
        onChangeComplete={(color: ColorResult) => {
          const hex = color.hex;
          const value = colorOptions[hex].value;
          setSelectedColor(hex);
          setSelectedColorValue(value);
        }}
      />
      <Button
        onClick={async () => {
          alert("disable" + " " + selectedColorValue);
        }}
      >
        Disable
      </Button>
      <Button
        onClick={async () => {
          alert("enable" + " " + selectedColorValue);
        }}
      >
        Enable
      </Button>
    </div>
  );
};

export default Component;
