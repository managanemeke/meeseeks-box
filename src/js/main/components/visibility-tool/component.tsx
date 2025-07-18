import {
  setEnabledToAllLayersWithLabel,
} from "../../shared/aeft";
import {CirclePicker, ColorResult} from "react-color";
import {Button} from "react-aria-components";
import {ColorOption} from "./types";
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
  const base = 4;
  const colorAmount = 16;
  const columnsAmount = 4;
  const rowsAmount = Math.ceil(colorAmount / columnsAmount);
  const circleSize = 4 * base;
  const circleSpacing = base;
  const pickerWidth = circleSize * columnsAmount + circleSpacing * (columnsAmount + 1);
  const pickerHeight = circleSize * rowsAmount + circleSpacing * (rowsAmount + 1);
  return (
    <>
      Layers with label
      <CirclePicker
        styles={{
          default: {
            card: {
              boxSizing: "border-box",
              overflow: "hidden",
              margin: 0,
              paddingLeft: circleSpacing,
              paddingTop: circleSpacing,
              width: pickerWidth,
              height: pickerHeight,
            }
          }
        }}
        circleSize={circleSize}
        circleSpacing={circleSpacing}
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
