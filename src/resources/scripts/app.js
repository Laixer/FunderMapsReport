import Alpine from "alpinejs";
import ui from "@alpinejs/ui";
import focus from "@alpinejs/focus";
// import dropdown from "./components/dropdown";

window.Alpine = Alpine;

// AlpineJS Components: Headless UI
// https://alpinejs.dev/components
Alpine.plugin(ui);

// AlpineJS PLugin: Collapse for smooth animations
Alpine.plugin(focus);

// Alpine.data("dropdown", dropdown);

Alpine.start();
