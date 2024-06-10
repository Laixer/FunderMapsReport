import colorLib from "@kurkle/color";

const COLORS = [
  "#28cc8b",
  "#17a4ea",
  "#fffaf0",
  "#ea5d17",
  "#ce0015",
  "#ce007c",
  "#7f8fa4",
];

export function color(index) {
  return COLORS[index % COLORS.length];
}

export function transparentize(value, opacity) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
  green: "rgb(40, 204, 139)",
  blue: "rgb(23, 164, 234)",
  yellow: "rgb(255, 204, 105)",
  orange: "rgb(234, 93, 23)",
  red: "rgb(237, 28, 36)",
  pink: "rgb(206, 0, 124)",
  grey: "rgb(127, 143, 164)",
};

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.pink,
  CHART_COLORS.grey,
];

export function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}
