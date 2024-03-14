/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{html,svg,mdx,js,ts}"],
  theme: {
    fontSize: {
      tag: [
        "0.6875rem",
        {
          lineHeight: "1",
          letterSpacing: "0.025em",
          fontWeight: "800",
          textTransform: "uppercase",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.5",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5",
        },
      ],
      lg: [
        "clamp(1.125rem, 1.0637rem + 0.2614vw, 1.25rem)", // 18px - 20px
        {
          lineHeight: "1.125",
          letterSpacing: "-0.02em",
        },
      ],
      xl: [
        "clamp(1.25rem, 1.0049rem + 1.0458vw, 1.75rem)", // 20px - 28px
        {
          lineHeight: "1.125",
          letterSpacing: "-0.02em",
        },
      ],
      "2xl": [
        "clamp(1.875rem, 1.6912rem + 0.7843vw, 2.25rem)", // 30px - 36px
        {
          lineHeight: "1.125",
          letterSpacing: "-0.02em",
        },
      ],
      "3xl": [
        "clamp(2.25rem, 1.9436rem + 1.3072vw, 2.875rem)", // 36px - 46px
        {
          lineHeight: "1.125",
          letterSpacing: "-0.02em",
        },
      ],
      "4xl": [
        "clamp(2.5rem, 2.0711rem + 1.8301vw, 3.375rem)", // 40px - 54px
        {
          lineHeight: "1.125",
          letterSpacing: "-0.001em",
        },
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      black: "#000000",
      white: "#ffffff",
      blue: {
        100: "#e7f6fd",
        200: "#d1edfb",
        500: "#17a4ea",
        900: "#191e3c",
      },
      green: {
        100: "#e9faf3",
        200: "#afecd4",
        500: "#28cc8b",
        700: "#149d67",
      },
      grey: {
        100: "#f6f7f8",
        200: "#e8eaf1",
        400: "#ced0da",
        700: "#7f8fa4",
        800: "#3d5372",
      },
      red: {
        500: "#ed1c24",
      },
      yellow: {
        100: "#fffaf0",
        500: "#ffcc69",
      },
      legenda: {
        default: {
          10: "#85dbbe",
          20: "#7edf9a",
          30: "#79e370",
          40: "#7ee587",
          50: "#96ed51",
          60: "#bdf450",
          70: "#d3e14d",
          80: "#c9b441",
          90: "#b59e3c",
          100: "#9d592d",
          110: "#8c3a28",
          120: "#7b2a2d",
        },
        risk: {
          10: "#42ff33",
          20: "#d1ff33",
          30: "#ffec33",
          40: "#ffac33",
          50: "#ff5533",
        },
        blue: {
          10: "#e1f1fd",
          20: "#bce4fb",
          30: "#81cff8",
          40: "#3eb7f2",
          50: "#17a4ea",
          60: "#087ec1",
          70: "#08659c",
          80: "#0b5581",
          90: "#0f476b",
          100: "#0a2e47",
        },
      },
    },
    fontFamily: {
      sans: "'Greycliff CF', Arial, sans-serif",
    },
    extend: {
      boxShadow: {
        hover:
          "0 10px 20px 0px rgb(0 0 0 / 0.1), 0 4px 4px 0px rgb(0 0 0 / 0.1)",
        card: "0 10px 20px 0px rgb(0 0 0 / 0.1), 0 4px 4px 0px rgb(0 0 0 / 0.1)",
        float: "0px 5px 15px 0px rgb(44 45 60 / 0.2)",
      },
    },
  },
  variants: {},
  plugins: [],
};
