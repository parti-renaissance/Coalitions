interface FeatureToggles {
  isCauseUpdateEnable: boolean;
  isProfilePageEnable: boolean;
  isCoalitionPageEnable: boolean;
  isCoalitionVideoPlaceholderEnable: boolean;
  isSendMailEnabled: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: true,
      isProfilePageEnable: true,
      isCoalitionPageEnable: false,
      isCoalitionVideoPlaceholderEnable: false,
      isSendMailEnabled: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
    isProfilePageEnable: true,
    isCoalitionPageEnable: true,
    isCoalitionVideoPlaceholderEnable: true,
    isSendMailEnabled: true,
  };
};
