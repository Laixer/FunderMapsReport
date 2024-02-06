export default () => ({
  leftPanelOpen: false,
  rightPanelOpen: false,

  toggle() {
    this.open = !this.open;
  },
});
