export default () => ({
  leftPanelOpen: false,
  rightPanelOpen: false,

  toggleLeftPanel() {
    this.leftPanelOpen = !this.leftPanelOpen;
  },
  toggleRightPanel() {
    this.rightPanelOpen = !this.rightPanelOpen;
  },
});
