import _ from "lodash";
import React, {useState} from 'react';
import {Picker, ColorSwatch, Item, Key} from '@adobe/react-spectrum';

interface ColorOption {
  label: string;
  value: string;
  color: string;
}

const colorOptions: Record<number, ColorOption> = {
  1: {label: 'Черный', value: 'black', color: '#000000'},
  2: {label: 'Белый', value: 'white', color: '#ffffff'},
  3: {label: 'Красный', value: 'red', color: '#ff0000'},
  4: {label: 'Зеленый', value: 'green', color: '#00ff00'},
  5: {label: 'Синий', value: 'blue', color: '#0000ff'},
};

const Component = () => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[1]);

  const handleSelectionChange = (key: Key | null) => {
    setSelectedColor(colorOptions[Number(key)]);
  };

  const items = () => {
    return _.map(colorOptions, (option: ColorOption) => (
      <Item key={option.value}>
        <ColorSwatch
          color={option.color}
        />
        <span>{option.label}</span>
      </Item>
    ));
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '300px'
    }}>
      <ColorSwatch
        color={"#00ff00"}
      />
      <Picker
        label="Выберите цвет"
        onSelectionChange={handleSelectionChange}
      >
        <>{ items() }</>
      </Picker>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'var(--spectrum-global-color-gray-50)',
        borderRadius: '4px'
      }}>
        <ColorSwatch
          color={selectedColor.color}
        />
        <div>
          <div style={{
            fontSize: '12px',
            color: 'var(--spectrum-global-color-gray-700)'
          }}>
            Выбранный цвет
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {selectedColor.label}
          </div>
        </div>
      </div>
      <input type={"text"} />
    </div>
  );
};

export default Component;
