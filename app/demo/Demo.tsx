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
      <script
        async
        // @ts-expect-error - TS doesn't know about the `repo` prop
        repo="live-feedback"
        owner="JulianKominovic"
        // src="https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js"
        src="http://192.168.1.48:5000/bundle-dev.js"
      />
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
