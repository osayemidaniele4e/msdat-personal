const getters = {
  getConfigObject: (state) => state.configObject,
  getSelectedConfig: (state) => state.selectedConfigurations,
  getLoadingStatus: (state) => state.loading,
  getIsGenerating: (state) => state.isGenerating,
  getIsResponding: (state) => state.isResponding,
  getIsTypingEffect: (state) => state.isTypingEffect,
  getConversation: (state) => state.conversationHistory,
  getIndicators: (state) => state.controlConfig[0].setup[0].options,
  getControlConfig: (state) => state.controlConfig[0].payload,
  getSelectedSection: (state) => state.selectedSection,
};

export default getters;
