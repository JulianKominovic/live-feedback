"use client";

import { useState } from "react";

export default function Demo() {
  const darkShades = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
  ];
  const lightShades = [
    "#FFFFFF",
    "#CCCCCC",
    "#999999",
    "#666666",
    "#333333",
    "#000000",
  ];
  const [darkMode, setDarkMode] = useState(false);
  const [shade, setShade] = useState(0);

  const background = darkMode ? darkShades[shade] : lightShades[shade];
  const color = darkMode ? lightShades[shade] : darkShades[shade];

  document.body.style.backgroundColor = background;
  document.body.style.color = color;

  return (
    <div>
      <h1>Page</h1>
      <button
        onClick={() => {
          setShade((shade) => (shade + 1) % darkShades.length);
        }}
      >
        Shade {shade}
      </button>
      <button onClick={() => setDarkMode((darkMode) => !darkMode)}>
        Toggle dark mode
      </button>
      <p>Dark mode is {darkMode ? "enabled" : "disabled"}</p>
    </div>
  );
}
