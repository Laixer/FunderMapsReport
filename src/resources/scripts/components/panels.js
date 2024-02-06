export default () => ({
  leftPanelOpen: false,
  leftPanelSlide: false,
  rightPanelOpen: false,
  rightPanelSlide: false,

  toggleLeftPanel() {
    this.leftPanelOpen = !this.leftPanelOpen;
  },
  toggleRightPanel() {
    this.rightPanelOpen = !this.rightPanelOpen;
  },
  slideLeftPanel() {
    this.leftPanelSlide = !this.leftPanelSlide;
  },
  slideRightPanel() {
    this.rightPanelSlide = !this.rightPanelSlide;
  },
});
