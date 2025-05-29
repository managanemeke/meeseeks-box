import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import { darkTheme, Provider } from '@adobe/react-spectrum';

import Main from "./main";

initBolt();

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider theme={darkTheme}>
      <Main />
    </Provider>
  </React.StrictMode>
);

root.addEventListener("click", function (event) {
  event.preventDefault();
});
