/* global chrome */
import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./contentScript";

function init() {
  const websiteContainer = document.createElement("div");
  if (!websiteContainer) {
    throw new Error("Can not find AppContainer");
  }
  document.body.appendChild(websiteContainer);
  const root = createRoot(websiteContainer);
  root.render(<ContentScript />);
}

init();
