import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
const MAX_Z_INDEX_POSSIBLE = 2147483647;
export const Z_INDEXES = {
  BUBBLE_CREATION_OVERLAY: MAX_Z_INDEX_POSSIBLE,
  TOOLBAR: MAX_Z_INDEX_POSSIBLE - 1,
  TOOLTIP: MAX_Z_INDEX_POSSIBLE - 2,
  THREADS_LIST: MAX_Z_INDEX_POSSIBLE - 3,
  HOVERED_BUBBLE: MAX_Z_INDEX_POSSIBLE - 4,
  BUBBLE: MAX_Z_INDEX_POSSIBLE - 5,
  SELECTED_TEXT: MAX_Z_INDEX_POSSIBLE - 6,
};
export const CSS_FRAGMENTS = {
  "box-styles": `background: rgba(0, 0, 0, 0.4);
  box-shadow:
    rgba(0, 0, 0, 0.5) 0px 0px 1px 1px,
    rgba(0, 0, 0, 0.25) 0px 4px 4px,
    rgba(255, 255, 255, 0.2) 0px 0px 1px 1px inset;
  backdrop-filter: blur(32px);`,
  "button-styles": `
  background: rgba(0, 0, 0, 0.2);
  box-shadow:
    rgba(0, 0, 0, 0.5) 0px 0px 1px 1px,
    rgba(0, 0, 0, 0.25) 0px 4px 4px,
    rgba(255, 255, 255, 0.2) 0px 0px 2px 0px inset; `,
};
export const COLORS = {
  transparent: "transparent",
  black: "#000000",
  white: "#ffffff",
  red: "#f44336",
  "red-50": "#ffebee",
  "red-100": "#ffcdd2",
  "red-200": "#ef9a9a",
  "red-300": "#e57373",
  "red-400": "#ef5350",
  "red-500": "#f44336",
  "red-600": "#e53935",
  "red-700": "#d32f2f",
  "red-800": "#c62828",
  "red-900": "#b71c1c",
  "red-100-accent": "#ff8a80",
  "red-200-accent": "#ff5252",
  "red-400-accent": "#ff1744",
  "red-700-accent": "#d50000",
  pink: "#e91e63",
  "pink-50": "#fce4ec",
  "pink-100": "#f8bbd0",
  "pink-200": "#f48fb1",
  "pink-300": "#f06292",
  "pink-400": "#ec407a",
  "pink-500": "#e91e63",
  "pink-600": "#d81b60",
  "pink-700": "#c2185b",
  "pink-800": "#ad1457",
  "pink-900": "#880e4f",
  "pink-100-accent": "#ff80ab",
  "pink-200-accent": "#ff4081",
  "pink-400-accent": "#f50057",
  "pink-700-accent": "#c51162",
  purple: "#9c27b0",
  "purple-50": "#f3e5f5",
  "purple-100": "#e1bee7",
  "purple-200": "#ce93d8",
  "purple-300": "#ba68c8",
  "purple-400": "#ab47bc",
  "purple-500": "#9c27b0",
  "purple-600": "#8e24aa",
  "purple-700": "#7b1fa2",
  "purple-800": "#6a1b9a",
  "purple-900": "#4a148c",
  "purple-100-accent": "#ea80fc",
  "purple-200-accent": "#e040fb",
  "purple-400-accent": "#d500f9",
  "purple-700-accent": "#aa00ff",
  "deep-purple": "#673ab7",
  "deep-purple-50": "#ede7f6",
  "deep-purple-100": "#d1c4e9",
  "deep-purple-200": "#b39ddb",
  "deep-purple-300": "#9575cd",
  "deep-purple-400": "#7e57c2",
  "deep-purple-500": "#673ab7",
  "deep-purple-600": "#5e35b1",
  "deep-purple-700": "#512da8",
  "deep-purple-800": "#4527a0",
  "deep-purple-900": "#311b92",
  "deep-purple-100-accent": "#b388ff",
  "deep-purple-200-accent": "#7c4dff",
  "deep-purple-400-accent": "#651fff",
  "deep-purple-700-accent": "#6200ea",
  indigo: "#3f51b5",
  "indigo-50": "#e8eaf6",
  "indigo-100": "#c5cae9",
  "indigo-200": "#9fa8da",
  "indigo-300": "#7986cb",
  "indigo-400": "#5c6bc0",
  "indigo-500": "#3f51b5",
  "indigo-600": "#3949ab",
  "indigo-700": "#303f9f",
  "indigo-800": "#283593",
  "indigo-900": "#1a237e",
  "indigo-100-accent": "#8c9eff",
  "indigo-200-accent": "#536dfe",
  "indigo-400-accent": "#3d5afe",
  "indigo-700-accent": "#304ffe",
  blue: "#2196f3",
  "blue-50": "#e3f2fd",
  "blue-100": "#bbdefb",
  "blue-200": "#90caf9",
  "blue-300": "#64b5f6",
  "blue-400": "#42a5f5",
  "blue-500": "#2196f3",
  "blue-600": "#1e88e5",
  "blue-700": "#1976d2",
  "blue-800": "#1565c0",
  "blue-900": "#0d47a1",
  "blue-100-accent": "#82b1ff",
  "blue-200-accent": "#448aff",
  "blue-400-accent": "#2979ff",
  "blue-700-accent": "#2962ff",
  "light-blue": "#03a9f4",
  "light-blue-50": "#e1f5fe",
  "light-blue-100": "#b3e5fc",
  "light-blue-200": "#81d4fa",
  "light-blue-300": "#4fc3f7",
  "light-blue-400": "#29b6f6",
  "light-blue-500": "#03a9f4",
  "light-blue-600": "#039be5",
  "light-blue-700": "#0288d1",
  "light-blue-800": "#0277bd",
  "light-blue-900": "#01579b",
  "light-blue-100-accent": "#80d8ff",
  "light-blue-200-accent": "#40c4ff",
  "light-blue-400-accent": "#00b0ff",
  "light-blue-700-accent": "#0091ea",
  cyan: "#00bcd4",
  "cyan-50": "#e0f7fa",
  "cyan-100": "#b2ebf2",
  "cyan-200": "#80deea",
  "cyan-300": "#4dd0e1",
  "cyan-400": "#26c6da",
  "cyan-500": "#00bcd4",
  "cyan-600": "#00acc1",
  "cyan-700": "#0097a7",
  "cyan-800": "#00838f",
  "cyan-900": "#006064",
  "cyan-100-accent": "#84ffff",
  "cyan-200-accent": "#18ffff",
  "cyan-400-accent": "#00e5ff",
  "cyan-700-accent": "#00b8d4",
  teal: "#009688",
  "teal-50": "#e0f2f1",
  "teal-100": "#b2dfdb",
  "teal-200": "#80cbc4",
  "teal-300": "#4db6ac",
  "teal-400": "#26a69a",
  "teal-500": "#009688",
  "teal-600": "#00897b",
  "teal-700": "#00796b",
  "teal-800": "#00695c",
  "teal-900": "#004d40",
  "teal-100-accent": "#a7ffeb",
  "teal-200-accent": "#64ffda",
  "teal-400-accent": "#1de9b6",
  "teal-700-accent": "#00bfa5",
  green: "#4caf50",
  "green-50": "#e8f5e9",
  "green-100": "#c8e6c9",
  "green-200": "#a5d6a7",
  "green-300": "#81c784",
  "green-400": "#66bb6a",
  "green-500": "#4caf50",
  "green-600": "#43a047",
  "green-700": "#388e3c",
  "green-800": "#2e7d32",
  "green-900": "#1b5e20",
  "green-100-accent": "#b9f6ca",
  "green-200-accent": "#69f0ae",
  "green-400-accent": "#00e676",
  "green-700-accent": "#00c853",
  "light-green": "#8bc34a",
  "light-green-50": "#f1f8e9",
  "light-green-100": "#dcedc8",
  "light-green-200": "#c5e1a5",
  "light-green-300": "#aed581",
  "light-green-400": "#9ccc65",
  "light-green-500": "#8bc34a",
  "light-green-600": "#7cb342",
  "light-green-700": "#689f38",
  "light-green-800": "#558b2f",
  "light-green-900": "#33691e",
  "light-green-100-accent": "#ccff90",
  "light-green-200-accent": "#b2ff59",
  "light-green-400-accent": "#76ff03",
  "light-green-700-accent": "#64dd17",
  lime: "#cddc39",
  "lime-50": "#f9fbe7",
  "lime-100": "#f0f4c3",
  "lime-200": "#e6ee9c",
  "lime-300": "#dce775",
  "lime-400": "#d4e157",
  "lime-500": "#cddc39",
  "lime-600": "#c0ca33",
  "lime-700": "#afb42b",
  "lime-800": "#9e9d24",
  "lime-900": "#827717",
  "lime-100-accent": "#f4ff81",
  "lime-200-accent": "#eeff41",
  "lime-400-accent": "#c6ff00",
  "lime-700-accent": "#aeea00",
  yellow: "#ffeb3b",
  "yellow-50": "#fffde7",
  "yellow-100": "#fff9c4",
  "yellow-200": "#fff59d",
  "yellow-300": "#fff176",
  "yellow-400": "#ffee58",
  "yellow-500": "#ffeb3b",
  "yellow-600": "#fdd835",
  "yellow-700": "#fbc02d",
  "yellow-800": "#f9a825",
  "yellow-900": "#f57f17",
  "yellow-100-accent": "#ffff8d",
  "yellow-200-accent": "#ffff00",
  "yellow-400-accent": "#ffea00",
  "yellow-700-accent": "#ffd600",
  amber: "#ffc107",
  "amber-50": "#fff8e1",
  "amber-100": "#ffecb3",
  "amber-200": "#ffe082",
  "amber-300": "#ffd54f",
  "amber-400": "#ffca28",
  "amber-500": "#ffc107",
  "amber-600": "#ffb300",
  "amber-700": "#ffa000",
  "amber-800": "#ff8f00",
  "amber-900": "#ff6f00",
  "amber-100-accent": "#ffe57f",
  "amber-200-accent": "#ffd740",
  "amber-400-accent": "#ffc400",
  "amber-700-accent": "#ffab00",
  orange: "#ff9800",
  "orange-50": "#fff3e0",
  "orange-100": "#ffe0b2",
  "orange-200": "#ffcc80",
  "orange-300": "#ffb74d",
  "orange-400": "#ffa726",
  "orange-500": "#ff9800",
  "orange-600": "#fb8c00",
  "orange-700": "#f57c00",
  "orange-800": "#ef6c00",
  "orange-900": "#e65100",
  "orange-100-accent": "#ffd180",
  "orange-200-accent": "#ffab40",
  "orange-400-accent": "#ff9100",
  "orange-700-accent": "#ff6d00",
  "deep-orange": "#ff5722",
  "deep-orange-50": "#fbe9e7",
  "deep-orange-100": "#ffccbc",
  "deep-orange-200": "#ffab91",
  "deep-orange-300": "#ff8a65",
  "deep-orange-400": "#ff7043",
  "deep-orange-500": "#ff5722",
  "deep-orange-600": "#f4511e",
  "deep-orange-700": "#e64a19",
  "deep-orange-800": "#d84315",
  "deep-orange-900": "#bf360c",
  "deep-orange-100-accent": "#ff9e80",
  "deep-orange-200-accent": "#ff6e40",
  "deep-orange-400-accent": "#ff3d00",
  "deep-orange-700-accent": "#dd2c00",
  brown: "#795548",
  "brown-50": "#efebe9",
  "brown-100": "#d7ccc8",
  "brown-200": "#bcaaa4",
  "brown-300": "#a1887f",
  "brown-400": "#8d6e63",
  "brown-500": "#795548",
  "brown-600": "#6d4c41",
  "brown-700": "#5d4037",
  "brown-800": "#4e342e",
  "brown-900": "#3e2723",
  grey: "#9e9e9e",
  "grey-50": "#fafafa",
  "grey-100": "#f5f5f5",
  "grey-200": "#eeeeee",
  "grey-300": "#e0e0e0",
  "grey-400": "#bdbdbd",
  "grey-500": "#9e9e9e",
  "grey-600": "#757575",
  "grey-700": "#616161",
  "grey-800": "#424242",
  "grey-900": "#212121",
  "blue-grey": "#607d8b",
  "blue-grey-50": "#eceff1",
  "blue-grey-100": "#cfd8dc",
  "blue-grey-200": "#b0bec5",
  "blue-grey-300": "#90a4ae",
  "blue-grey-400": "#78909c",
  "blue-grey-500": "#607d8b",
  "blue-grey-600": "#546e7a",
  "blue-grey-700": "#455a64",
  "blue-grey-800": "#37474f",
  "blue-grey-900": "#263238",
  "red-contrast": "white",
  "red-50-contrast": "black",
  "red-100-contrast": "black",
  "red-200-contrast": "black",
  "red-300-contrast": "black",
  "red-400-contrast": "black",
  "red-500-contrast": "white",
  "red-600-contrast": "white",
  "red-700-contrast": "white",
  "red-800-contrast": "white",
  "red-900-contrast": "white",
  "red-100-accent-contrast": "black",
  "red-200-accent-contrast": "white",
  "red-400-accent-contrast": "white",
  "red-700-accent-contrast": "white",
  "pink-contrast": "white",
  "pink-50-contrast": "black",
  "pink-100-contrast": "black",
  "pink-200-contrast": "black",
  "pink-300-contrast": "black",
  "pink-400-contrast": "black",
  "pink-500-contrast": "white",
  "pink-600-contrast": "white",
  "pink-700-contrast": "white",
  "pink-800-contrast": "white",
  "pink-900-contrast": "white",
  "pink-100-accent-contrast": "black",
  "pink-200-accent-contrast": "white",
  "pink-400-accent-contrast": "white",
  "pink-700-accent-contrast": "white",
  "purple-contrast": "white",
  "purple-50-contrast": "black",
  "purple-100-contrast": "black",
  "purple-200-contrast": "black",
  "purple-300-contrast": "white",
  "purple-400-contrast": "white",
  "purple-500-contrast": "white",
  "purple-600-contrast": "white",
  "purple-700-contrast": "white",
  "purple-800-contrast": "white",
  "purple-900-contrast": "white",
  "purple-100-accent-contrast": "black",
  "purple-200-accent-contrast": "white",
  "purple-400-accent-contrast": "white",
  "purple-700-accent-contrast": "white",
  "deep-purple-contrast": "white",
  "deep-purple-50-contrast": "black",
  "deep-purple-100-contrast": "black",
  "deep-purple-200-contrast": "black",
  "deep-purple-300-contrast": "white",
  "deep-purple-400-contrast": "white",
  "deep-purple-500-contrast": "white",
  "deep-purple-600-contrast": "white",
  "deep-purple-700-contrast": "white",
  "deep-purple-800-contrast": "white",
  "deep-purple-900-contrast": "white",
  "deep-purple-100-accent-contrast": "black",
  "deep-purple-200-accent-contrast": "white",
  "deep-purple-400-accent-contrast": "white",
  "deep-purple-700-accent-contrast": "white",
  "indigo-contrast": "white",
  "indigo-50-contrast": "black",
  "indigo-100-contrast": "black",
  "indigo-200-contrast": "black",
  "indigo-300-contrast": "white",
  "indigo-400-contrast": "white",
  "indigo-500-contrast": "white",
  "indigo-600-contrast": "white",
  "indigo-700-contrast": "white",
  "indigo-800-contrast": "white",
  "indigo-900-contrast": "white",
  "indigo-100-accent-contrast": "black",
  "indigo-200-accent-contrast": "white",
  "indigo-400-accent-contrast": "white",
  "indigo-700-accent-contrast": "white",
  "blue-contrast": "white",
  "blue-50-contrast": "black",
  "blue-100-contrast": "black",
  "blue-200-contrast": "black",
  "blue-300-contrast": "black",
  "blue-400-contrast": "black",
  "blue-500-contrast": "white",
  "blue-600-contrast": "white",
  "blue-700-contrast": "white",
  "blue-800-contrast": "white",
  "blue-900-contrast": "white",
  "blue-100-accent-contrast": "black",
  "blue-200-accent-contrast": "white",
  "blue-400-accent-contrast": "white",
  "blue-700-accent-contrast": "white",
  "light-blue-contrast": "white",
  "light-blue-50-contrast": "black",
  "light-blue-100-contrast": "black",
  "light-blue-200-contrast": "black",
  "light-blue-300-contrast": "black",
  "light-blue-400-contrast": "black",
  "light-blue-500-contrast": "white",
  "light-blue-600-contrast": "white",
  "light-blue-700-contrast": "white",
  "light-blue-800-contrast": "white",
  "light-blue-900-contrast": "white",
  "light-blue-100-accent-contrast": "black",
  "light-blue-200-accent-contrast": "black",
  "light-blue-400-accent-contrast": "black",
  "light-blue-700-accent-contrast": "white",
  "cyan-contrast": "white",
  "cyan-50-contrast": "black",
  "cyan-100-contrast": "black",
  "cyan-200-contrast": "black",
  "cyan-300-contrast": "black",
  "cyan-400-contrast": "black",
  "cyan-500-contrast": "white",
  "cyan-600-contrast": "white",
  "cyan-700-contrast": "white",
  "cyan-800-contrast": "white",
  "cyan-900-contrast": "white",
  "cyan-100-accent-contrast": "black",
  "cyan-200-accent-contrast": "black",
  "cyan-400-accent-contrast": "black",
  "cyan-700-accent-contrast": "black",
  "teal-contrast": "white",
  "teal-50-contrast": "black",
  "teal-100-contrast": "black",
  "teal-200-contrast": "black",
  "teal-300-contrast": "black",
  "teal-400-contrast": "black",
  "teal-500-contrast": "white",
  "teal-600-contrast": "white",
  "teal-700-contrast": "white",
  "teal-800-contrast": "white",
  "teal-900-contrast": "white",
  "teal-100-accent-contrast": "black",
  "teal-200-accent-contrast": "black",
  "teal-400-accent-contrast": "black",
  "teal-700-accent-contrast": "black",
  "green-contrast": "white",
  "green-50-contrast": "black",
  "green-100-contrast": "black",
  "green-200-contrast": "black",
  "green-300-contrast": "black",
  "green-400-contrast": "black",
  "green-500-contrast": "white",
  "green-600-contrast": "white",
  "green-700-contrast": "white",
  "green-800-contrast": "white",
  "green-900-contrast": "white",
  "green-100-accent-contrast": "black",
  "green-200-accent-contrast": "black",
  "green-400-accent-contrast": "black",
  "green-700-accent-contrast": "black",
  "light-green-contrast": "black",
  "light-green-50-contrast": "black",
  "light-green-100-contrast": "black",
  "light-green-200-contrast": "black",
  "light-green-300-contrast": "black",
  "light-green-400-contrast": "black",
  "light-green-500-contrast": "black",
  "light-green-600-contrast": "black",
  "light-green-700-contrast": "black",
  "light-green-800-contrast": "white",
  "light-green-900-contrast": "white",
  "light-green-100-accent-contrast": "black",
  "light-green-200-accent-contrast": "black",
  "light-green-400-accent-contrast": "black",
  "light-green-700-accent-contrast": "black",
  "lime-contrast": "black",
  "lime-50-contrast": "black",
  "lime-100-contrast": "black",
  "lime-200-contrast": "black",
  "lime-300-contrast": "black",
  "lime-400-contrast": "black",
  "lime-500-contrast": "black",
  "lime-600-contrast": "black",
  "lime-700-contrast": "black",
  "lime-800-contrast": "black",
  "lime-900-contrast": "white",
  "lime-100-accent-contrast": "black",
  "lime-200-accent-contrast": "black",
  "lime-400-accent-contrast": "black",
  "lime-700-accent-contrast": "black",
  "yellow-contrast": "black",
  "yellow-50-contrast": "black",
  "yellow-100-contrast": "black",
  "yellow-200-contrast": "black",
  "yellow-300-contrast": "black",
  "yellow-400-contrast": "black",
  "yellow-500-contrast": "black",
  "yellow-600-contrast": "black",
  "yellow-700-contrast": "black",
  "yellow-800-contrast": "black",
  "yellow-900-contrast": "black",
  "yellow-100-accent-contrast": "black",
  "yellow-200-accent-contrast": "black",
  "yellow-400-accent-contrast": "black",
  "yellow-700-accent-contrast": "black",
  "amber-contrast": "black",
  "amber-50-contrast": "black",
  "amber-100-contrast": "black",
  "amber-200-contrast": "black",
  "amber-300-contrast": "black",
  "amber-400-contrast": "black",
  "amber-500-contrast": "black",
  "amber-600-contrast": "black",
  "amber-700-contrast": "black",
  "amber-800-contrast": "black",
  "amber-900-contrast": "black",
  "amber-100-accent-contrast": "black",
  "amber-200-accent-contrast": "black",
  "amber-400-accent-contrast": "black",
  "amber-700-accent-contrast": "black",
  "orange-contrast": "black",
  "orange-50-contrast": "black",
  "orange-100-contrast": "black",
  "orange-200-contrast": "black",
  "orange-300-contrast": "black",
  "orange-400-contrast": "black",
  "orange-500-contrast": "black",
  "orange-600-contrast": "black",
  "orange-700-contrast": "black",
  "orange-800-contrast": "white",
  "orange-900-contrast": "white",
  "orange-100-accent-contrast": "black",
  "orange-200-accent-contrast": "black",
  "orange-400-accent-contrast": "black",
  "orange-700-accent-contrast": "black",
  "deep-orange-contrast": "white",
  "deep-orange-50-contrast": "black",
  "deep-orange-100-contrast": "black",
  "deep-orange-200-contrast": "black",
  "deep-orange-300-contrast": "black",
  "deep-orange-400-contrast": "black",
  "deep-orange-500-contrast": "white",
  "deep-orange-600-contrast": "white",
  "deep-orange-700-contrast": "white",
  "deep-orange-800-contrast": "white",
  "deep-orange-900-contrast": "white",
  "deep-orange-100-accent-contrast": "black",
  "deep-orange-200-accent-contrast": "black",
  "deep-orange-400-accent-contrast": "white",
  "deep-orange-700-accent-contrast": "white",
  "brown-contrast": "white",
  "brown-50-contrast": "black",
  "brown-100-contrast": "black",
  "brown-200-contrast": "black",
  "brown-300-contrast": "white",
  "brown-400-contrast": "white",
  "brown-500-contrast": "white",
  "brown-600-contrast": "white",
  "brown-700-contrast": "white",
  "brown-800-contrast": "white",
  "brown-900-contrast": "white",
  "grey-contrast": "black",
  "grey-50-contrast": "black",
  "grey-100-contrast": "black",
  "grey-200-contrast": "black",
  "grey-300-contrast": "black",
  "grey-400-contrast": "black",
  "grey-500-contrast": "black",
  "grey-600-contrast": "white",
  "grey-700-contrast": "white",
  "grey-800-contrast": "white",
  "grey-900-contrast": "white",
  "blue-grey-contrast": "white",
  "blue-grey-50-contrast": "black",
  "blue-grey-100-contrast": "black",
  "blue-grey-200-contrast": "black",
  "blue-grey-300-contrast": "black",
  "blue-grey-400-contrast": "white",
  "blue-grey-500-contrast": "white",
  "blue-grey-600-contrast": "white",
  "blue-grey-700-contrast": "white",
  "blue-grey-800-contrast": "white",
  "blue-grey-900-contrast": "white",
};
export const GlobalStyles = () => (
  <Global
    styles={css`
      .live-feedback-link-focus-animation {
        animation: live-feedback-link-focus-animation 3s ease-in-out;
      }
      @keyframes live-feedback-link-focus-animation {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(2);
        }
        100% {
          transform: scale(1);
        }
      }
    `}
  />
);
export const LiveFeedbackGlobalStyles = () => (
  <Global
    styles={css`
      *:not(input, textarea) {
        user-select: none;
      }
      [data-live-feedback="true"] *::before,
      [data-live-feedback="true"] *::after,
      [data-live-feedback="true"] * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: none;
        color: ${COLORS["grey-900-contrast"]};
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          "Open Sans",
          "Helvetica Neue",
          sans-serif;
        text-shadow: 0 0 0 black;
      }
    `}
  />
);

export const ResetCSS = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    color: ${COLORS["grey-900-contrast"]};
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    font-size: 14px;
    line-height: 16px;
    outline: 2px solid transparent;
    outline-offset: 0px;
    transition: outline-offset 0.15s ease-in-out;
  }

  /* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
  /** {
  scrollbar-width: thin;
  scrollbar-color: #397524 rgba(0, 0, 0, 0.2);
}*/

  /* Chrome, Edge and Safari */
  *::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease-in-out;
  }

  *::-webkit-scrollbar-track:hover {
    background-color: rgba(255, 255, 255, 0.4);
    transition: background-color 0.2s ease-in-out;
  }

  *::-webkit-scrollbar-track:active {
    background-color: rgba(255, 255, 255, 0.4);
    transition: background-color 0.2s ease-in-out;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .spinner_V8m1 {
    transform-origin: center;
    animation: spinner_zKoa 2s linear infinite;
  }
  .spinner_V8m1 circle {
    stroke-linecap: round;
    animation: spinner_YpZS 1.5s ease-in-out infinite;
  }
  @keyframes spinner_zKoa {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spinner_YpZS {
    0% {
      stroke-dasharray: 0 150;
      stroke-dashoffset: 0;
    }
    47.5% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -16;
    }
    95%,
    100% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -59;
    }
  }

  &[data-is-picking="true"] {
    top: 0;
    left: 0;
    z-index: ${Z_INDEXES.BUBBLE_CREATION_OVERLAY};
    position: fixed;
    width: 100vw;
    height: 100dvh;
    cursor: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE0N18yKSI+CjxwYXRoIGQ9Ik0tNC45MzA2MWUtMDcgMy41QzAuMDYxMjg2NSAyLjU2MDcyIDAuMzQ4OTAyIDEuMzU3MTQgMS4wNTU1NSAwLjczNTM0N0MxLjc2MjIgMC4xMTM1NTQgMi44MzAyMiAwLjEyNDI5NiAzLjc2OTY0IDAuMTgzMDM0QzQuMTI2MjggMC4yMTI4OSA0LjQ3NzM1IDAuMjkwMTAzIDQuODEzNiAwLjQxMjYzOEwxNC44MDgyIDQuNzc5M0MxNS4xNDE2IDQuOTA2MjUgMTUuNDkxNCA0LjgwNjgxIDE1Ljc3MTcgNC42NjcxMUwxNS44Mjg4IDQuNjQwMDZDMTUuODQ3NCA0LjYzMDEgMTUuOTIzOCA0LjU4MjA0IDE1Ljk3OTkgNC41NDhDMTYuMDM2IDQuNTEzOTcgMTYuMDk2NiA0LjQ3NDY2IDE2LjE1NTYgNC40Mzk0MUwxNi4xOTQ1IDQuNDE1NDJDMjEuMjU4OCAxLjQ5NzM1IDI3LjA2ODMgMC4xMzA0OTEgMzIuOTAyNCAwLjQ4NDQzQzQwLjg1OTQgMC45NDEzNTkgNDguMTg3MSA0LjUwODkgNTMuNTQ1NSAxMC41MzMzQzU5LjA3NzIgMTYuNzY2NCA2MS44NDMzIDI0LjgyMzEgNjEuMzMzNiAzMy4yMzg3QzYwLjkwNDggNDAuMzc4MSA1OC4wNTY5IDQ3LjE1ODUgNTMuMjU5MiA1Mi40NjI5QzQ4LjU0MzIgNTcuNjQ3IDQyLjIwMTIgNjEuMDY0NiAzNS4zOSA2Mi4wODU4QzMzLjMyMDUgNjIuNDAxOCAzMS4yMjMzIDYyLjQ5NjkgMjkuMTMzNyA2Mi4zNjk2QzIwLjk5MzIgNjEuODc2NiAxMy41MzY1IDU4LjI4NiA4LjEzNTMxIDUyLjI1NzdDMi42ODA0NyA0Ni4xNzYyIC0wLjAzOTAzOTYgMzguMjg4NyAwLjQ1OTk5OSAzMC4wNDg1QzAuNjM1Njg3IDI3LjE0NzUgMS42MDA5MiAyMy40ODA1IDIuMjExNjcgMjEuNzI4OUMyLjk0MTA0IDE5LjYyMTIgMy44NDU5NyAxNy42MzY1IDMuOTQyNDEgMTcuNDE3N0M0LjA0NzQ1IDE3LjE4NjQgNC4xMDk0OSAxNi45Mzc4IDQuMTI1NDggMTYuNjg0MkM0LjE0MzggMTYuNDA5MyA0LjEwNjI3IDE2LjEzMzUgNC4wMTUxNCAxNS44NzM0TDMuOTc2NjcgMTUuNzUzMkwwLjIyODkxNSA0Ljk2Mjc1QzAuMDYzOTE5OCA0LjQ5MzI0IC0wLjAxMzY2NzIgMy45OTc0NyAtNC45MzA2MWUtMDcgMy41WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTIuODg3MiA2LjA4NTkyQzIuOTQyOCA1LjIzMzU4IDMuMjAyOTcgNC4xNDEzNiAzLjg0MTY0IDMuNTc2OTZDNC40ODAzMSAzLjAxMjU3IDUuNDQ1MzUgMy4wMjIwNyA2LjI5NDE5IDMuMDc1MTVDNi42MTY0NCAzLjEwMjE2IDYuOTMzNjUgMy4xNzIxNCA3LjIzNzQ2IDMuMjgzMjVMMTYuMjY3NSA3LjI0MzM0QzE2LjU2ODcgNy4zNTg0NiAxNi44ODQ4IDcuMjY4MTUgMTcuMTM4MSA3LjE0MTMxTDE3LjE4OTcgNy4xMTY3NkMxNy4yMDY1IDcuMTA3NzEgMTcuMjc1NSA3LjA2NDA4IDE3LjMyNjMgNy4wMzMxOEMxNy4zNzcgNy4wMDIyOSAxNy40MzE4IDYuOTY2NiAxNy40ODUxIDYuOTM0NkwxNy41MjAyIDYuOTEyODJDMjIuMDk2OSA0LjI2MzcyIDI3LjM0NjcgMy4wMjIwNCAzMi42MTgyIDMuMzQxODVDMzkuODA4IDMuNzU0NjMgNDYuNDI4NCA2Ljk5MDIgNTEuMjY4OSAxMi40NTU2QzU2LjI2NTcgMTguMTEwNCA1OC43NjMzIDI1LjQyMDYgNTguMzAwOCAzMy4wNTczQzU3LjkxMTcgMzkuNTM1OSA1NS4zMzY4IDQ1LjY4OTIgNTEuMDAwNCA1MC41MDM2QzQ2LjczNzkgNTUuMjA4OSA0MS4wMDY0IDU4LjMxMTcgMzQuODUxNyA1OS4yMzk5QzMyLjk4MTYgNTkuNTI3MSAzMS4wODY2IDU5LjYxMzkgMjkuMTk4NSA1OS40OTg5QzIxLjg0MjggNTkuMDUzNCAxNS4xMDU5IDU1Ljc5NyAxMC4yMjY4IDUwLjMyNzlDNS4yOTkzMSA0NC44MTA3IDIuODQzODIgMzcuNjU0IDMuMjk2NjcgMzAuMTc2NkMzLjQ1NjEgMjcuNTQ0MSA0LjMyOTEyIDI0LjIxNjMgNC44ODE0IDIyLjYyNjdDNS41NDA5NCAyMC43MTQgNi4zNTkxIDE4LjkxMjggNi40NDYyOSAxOC43MTQzQzYuNTQxMjYgMTguNTA0MyA2LjU5NzM3IDE4LjI3ODggNi42MTE4OCAxOC4wNDg3QzYuNjI4NSAxNy43OTkyIDYuNTk0NjUgMTcuNTQ4OSA2LjUxMjM3IDE3LjMxMjlMNi40Nzc2MyAxNy4yMDM5TDMuMDkzNzEgNy40MTMyQzIuOTQ0NzMgNi45ODcyIDIuODc0NzQgNi41MzczNCAyLjg4NzIgNi4wODU5MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01LjQ5MTQyIDguNjE5ODRDNS41NDE0NSA3Ljg1MzE4IDUuNzc2MiA2Ljg3MDggNi4zNTI5OCA2LjM2MzI4QzYuOTI5NzYgNS44NTU3NiA3LjgwMTUgNS44NjQ1MyA4LjU2ODI3IDUuOTEyNDdDOC44NTkzNiA1LjkzNjg0IDkuMTQ1OTEgNS45OTk4NyA5LjQyMDM3IDYuMDk5ODhMMTcuNTc4MSA5LjY2NDAzQzE3Ljg1MDIgOS43Njc2NSAxOC4xMzU4IDkuNjg2NDggMTguMzY0NSA5LjU3MjQ1TDE4LjQxMTEgOS41NTAzOEMxOC40MjYzIDkuNTQyMjUgMTguNDg4NyA5LjUwMzAyIDE4LjUzNDUgOS40NzUyNEMxOC41ODAzIDkuNDQ3NDYgMTguNjI5OCA5LjQxNTM3IDE4LjY3NzkgOS4zODY2TDE4LjcwOTcgOS4zNjcwMkMyMi44NDMyIDYuOTg1MjUgMjcuNTg1MSA1Ljg2OTU5IDMyLjM0NjkgNi4xNTg0OEMzOC44NDE1IDYuNTMxNDMgNDQuODIyNSA5LjQ0MzMyIDQ5LjE5NjIgMTQuMzYwNUM1My43MTEyIDE5LjQ0ODEgNTUuOTY5IDI2LjAyNDEgNTUuNTUzIDMyLjg5MzFDNTUuMjAzIDM4LjcyMDQgNTIuODc4NSA0NC4yNTQ3IDQ4Ljk2MjUgNDguNTg0MkM0NS4xMTMzIDUyLjgxNTUgMzkuOTM2NyA1NS42MDUxIDM0LjM3NzQgNTYuNDM4NkMzMi42ODgyIDU2LjY5NjUgMzAuOTc2NCA1Ni43NzQyIDI5LjI3MDkgNTYuNjcwM0MyMi42MjY0IDU2LjI2NzkgMTYuNTQwMiA1My4zMzcyIDEyLjEzMTYgNDguNDE2N0M3LjY3OTI3IDQzLjQ1MjkgNS40NTk1NiAzNy4wMTUgNS44NjY4OCAzMC4yODkyQzYuMDEwMjggMjcuOTIxMyA2Ljc5ODEyIDI0LjkyODIgNy4yOTY2MiAyMy40OTg2QzcuODkxOTUgMjEuNzc4MiA4LjYzMDU3IDIwLjE1ODMgOC43MDkyOSAxOS45Nzk3QzguNzk1MDIgMTkuNzkwOSA4Ljg0NTY2IDE5LjU4OCA4Ljg1ODcxIDE5LjM4MTFDOC44NzM2NyAxOS4xNTY2IDguODQzMDMgMTguOTMxNSA4Ljc2ODY1IDE4LjcxOTJMOC43MzcyNSAxOC42MjExTDUuNjc4MjcgOS44MTM3NkM1LjU0MzYgOS40MzA1NCA1LjQ4MDI3IDkuMDI1ODggNS40OTE0MiA4LjYxOTg0WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNDdfMiI+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0IDYuMTAzNTJlLTA1KSByb3RhdGUoOTApIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="),
      crosshair;
  }

  *:focus {
    transition: outline-offset 0.15s ease-in-out 0s;
    outline: rgb(90, 90, 90) solid 1px;
    outline-offset: 3px;
    border: none;
  }
  button {
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;
