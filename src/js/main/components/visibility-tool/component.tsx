import {
  setEnabledToAllLayersWithLabel,
} from "../../shared/aeft";
import {CirclePicker, ColorResult} from "react-color";
import {Button} from "react-aria-components";
import {ColorOption} from "../color-picker/types";
import {getLabelColors, getLabelNames} from "../../../lib/utils/aeft";
import _, {padStart} from "lodash";
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
    <>
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
          await setEnabledToAllLayersWithLabel(selectedColorValue, false);
        }}
      >
        disable!
      </Button>
      <Button
        onClick={async () => {
          await setEnabledToAllLayersWithLabel(selectedColorValue, true);
        }}
      >
        enable!
      </Button>
    </>
  );
};

export default Component;
