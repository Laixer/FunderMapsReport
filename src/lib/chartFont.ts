import Chart from 'chart.js/auto'

/**
 * The report's own font for everything a chart writes (title, axis labels),
 * instead of Chart.js' Helvetica / Arial.
 *
 * A canvas is drawn with the font as it is at that moment and, unlike text
 * in the page, is not drawn again when the file arrives. So the font is
 * asked for here, at start-up, and a chart is drawn after `chartFontLoaded`:
 * which font a chart gets must not depend on whether the font or the
 * report's data comes in first.
 */
const family = "'Greycliff CF', Arial, sans-serif"

Chart.defaults.font.family = family

// Regular for the axes, bold for the title. Never a rejection and never
// longer than a few seconds: without the file a chart is still drawn, in the
// next font of the list.
export const chartFontLoaded: Promise<unknown> = Promise.race([
  Promise.all([
    document.fonts.load(`12px ${family}`),
    document.fonts.load(`bold 12px ${family}`),
  ]),
  new Promise((resolve) => setTimeout(resolve, 5000)),
]).catch(() => undefined)
