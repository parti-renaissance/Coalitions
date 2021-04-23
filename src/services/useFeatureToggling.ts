interface FeatureToggles {
  isCauseUpdateEnable: boolean;
  isProfilePageEnable: boolean;
  isCoalitionPageEnable: boolean;
  isCoalitionVideoPlaceholderEnable: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: true,
      isProfilePageEnable: true,
      isCoalitionPageEnable: false,
      isCoalitionVideoPlaceholderEnable: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
    isProfilePageEnable: true,
    isCoalitionPageEnable: false,
    isCoalitionVideoPlaceholderEnable: true,
  };
};
