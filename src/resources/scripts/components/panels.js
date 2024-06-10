export default () => ({
  leftPanelOpen: false,
  leftPanelSlide: false,
  rightPanelOpen: false,
  rightPanelSlide: false,
  informationModalOpen: false,
  settingsModalOpen: false,
  statisticsModalOpen: false,
  popupRapportageOpen: false,

  setLeftPanel(mode = !this.leftPanelOpen) {
    this.setPopupRapportage(false);
    this.leftPanelOpen = mode;
  },
  setRightPanel(mode = !this.rightPanelOpen) {
    this.rightPanelOpen = mode;
  },
  setInformationModal(mode = !this.informationModalOpen) {
    this.hideAllModals();
    this.informationModalOpen = mode;
  },
  setSettingsModal(mode = !this.settingsModalOpen) {
    this.hideAllModals();
    this.settingsModalOpen = mode;
  },
  setStatisticsModal(mode = !this.statisticsModalOpen) {
    this.hideAllModals();
    this.statisticsModalOpen = mode;
  },
  setLeftPanelSlide(mode = !this.leftPanelSlide) {
    this.leftPanelSlide = mode;
  },
  setRightPanelSlide(mode = !this.rightPanelSlide) {
    this.rightPanelSlide = mode;
  },
  setPopupRapportage(mode = !this.popupRapportageOpen) {
    this.popupRapportageOpen = mode;
  },

  hideAllModals() {
    this.informationModalOpen = false;
    this.settingsModalOpen = false;
    this.statisticsModalOpen = false;
  },

  init() {
    this.$watch("!leftPanelOpen", () => {
      window.setTimeout(() => {
        this.leftPanelSlide = false;
      }, 200);
    });

    this.$watch("!rightPanelOpen", () => {
      window.setTimeout(() => {
        this.rightPanelSlide = false;
      }, 200);
    });
  },
});
