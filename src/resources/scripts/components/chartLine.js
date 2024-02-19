// eslint-disable-next-line import/no-extraneous-dependencies
import { Chart } from "chart.js/auto";
import * as Utils from "../utils/utils";

const DATA = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

export default () => ({
  data: DATA,
  init() {
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(this.$refs.canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: this.data.map((row) => row.year),
        datasets: [
          {
            label: "Example Chart",
            data: this.data.map((row) => row.count),
            borderColor: Utils.CHART_COLORS.green,
            backgroundColor: Utils.transparentize(
              Utils.CHART_COLORS.green,
              0.5,
            ),
            borderWidth: 1,
            fill: {
              target: "start",
            },
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true } },
      },
    });

    // Disable animation in the popup, it is too much
    chart.options.animations = false;

    // eslint-disable-next-line no-console
    console.log("hello from chartLine.js");
    // eslint-disable-next-line no-console
    console.log(chart);
  },
});
