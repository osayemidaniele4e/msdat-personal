const getters = {
  getConfigObject: (state) => state.configObject,
  getSelectedConfig: (state) => state.selectedConfigurations,
  getLoadingStatus: (state) => state.loading,
  getIsGenerating: (state) => state.isGenerating,
  getConversation: (state) => state.conversationHistory,
};

export default getters;
