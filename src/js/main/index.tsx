import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import "@spectrum-web-components/theme/theme-dark.js";
import '@spectrum-web-components/theme/express/theme-dark.js';
import "@spectrum-web-components/theme/scale-medium.js";
import '@spectrum-web-components/theme/express/scale-medium.js';
import { Theme } from "@swc-react/theme";

import Main from "./main";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme system="spectrum" scale="medium" color="dark">
      <Main />
    </Theme>
  </React.StrictMode>
);
