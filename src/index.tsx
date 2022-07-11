import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { initFirebase } from "./init/firebase";
import { disableScrollOnMobiles } from "./init/disableScrollOnMobiles";

initFirebase();
disableScrollOnMobiles();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
