import React from "react";

import {
  TabList,
  Tabs,
  Item,
  TabPanels, Key,
} from "@adobe/react-spectrum";
import {DesignerTab} from "../index";

const Component = () => {
  let tabs = [
    {
      id: 1,
      name: 'designer',
      children: <DesignerTab />
    },
    {
      id: 2,
      name: 'developer',
      children: 'developer'
    },
  ];
  type Tab = typeof tabs[0];
  let [, setTabId] = React.useState<Key>(1);
  return (
    <>
      <Tabs
        items={tabs}
        onSelectionChange={setTabId}
      >
        { /* @ts-ignore */ }
        <TabList>
          {(item: Tab) => (
            <Item>
              {item.name}
            </Item>
          )}
        </TabList>
        { /* @ts-ignore */ }
        <TabPanels>
          {(item: Tab) => (
            <Item>
              {item.children}
            </Item>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Component;
