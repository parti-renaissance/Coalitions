interface FeatureToggles {
  isCauseUpdateEnable: boolean;
  isProfilePageEnable: boolean;
  isCoalitionPageEnable: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: true,
      isProfilePageEnable: false,
      isCoalitionPageEnable: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
    isProfilePageEnable: true,
    isCoalitionPageEnable: true,
  };
};
