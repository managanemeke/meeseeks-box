import React from "react";

import {
  TabList,
  Tabs,
  Item,
  TabPanels, Key,
} from "@adobe/react-spectrum";

const Component = () => {
  let tabs = [
    {
      id: 1,
      name: 'Founding of Rome',
      children: 'Arma virumque cano, Troiae qui primus ab oris.'
    },
    {
      id: 2,
      name: 'Monarchy and Republic',
      children: 'Senatus Populusque Romanus.'
    },
    { id: 3, name: 'Empire', children: 'Alea jacta est.' }
  ];
  type Tab = typeof tabs[0];
  let [tabId, setTabId] = React.useState<Key>(1);
  return (
    <>
      <p>Current tab id: {tabId}</p>
      <Tabs
        aria-label="History of Ancient Rome"
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
