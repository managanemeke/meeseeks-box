import _ from "lodash";
import React, {useState} from 'react';
import {Picker, ColorSwatch, Item, Key} from '@adobe/react-spectrum';

import Props from "./props";
import {ColorOption} from "./types";


const Component = (props: Props) => {
  const { options: colorOptions } = props;
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[1]);

  const handleSelectionChange = (key: Key | null) => {
    setSelectedColor(colorOptions[Number(key)]);
  };

  const items = () => {
    return _.map(colorOptions, (option: ColorOption) => (
      <Item key={option.value}>
        <ColorSwatch
          color={option.color}
          size={"XS"}
        />
        <div>
          {option.label}
        </div>
      </Item>
    ));
  };

  return (
    <Picker
      label={"Label:"}
      placeholder={"Select..."}
      onSelectionChange={handleSelectionChange}
    >
      { items() }
    </Picker>
  );
};

export default Component;
