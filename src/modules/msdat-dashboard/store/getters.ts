const getters = {
  getConfigObject: (state) => state.configObject,
  getSelectedConfig: (state) => state.selectedConfigurations,
  getLoadingStatus: (state) => state.loading,
  getIsGenerating: (state) => state.isGenerating,
  getIsResponding: (state) => state.isResponding,
  getIsTypingEffect: (state) => state.isTypingEffect,
  getConversation: (state) => state.conversationHistory,
};

export default getters;
