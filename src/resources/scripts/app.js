import Alpine from "alpinejs";
import ui from "@alpinejs/ui";
import focus from "@alpinejs/focus";

// Import Components
import panels from "./components/panels";
import chartLine from "./components/chartLine";

document.addEventListener("DOMContentLoaded", () => {
  window.Alpine = Alpine;

  // AlpineJS Components: Headless UI
  // https://alpinejs.dev/components
  Alpine.plugin(ui);

  // AlpineJS PLugin: Collapse for smooth animations
  Alpine.plugin(focus);

  Alpine.data("panels", panels);
  Alpine.data("chartLine", chartLine);

  Alpine.start();
});
