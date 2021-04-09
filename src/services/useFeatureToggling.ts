interface FeatureToggles {
  isCauseUpdateEnable: boolean;
  isProfilePageEnable: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: false,
      isProfilePageEnable: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
    isProfilePageEnable: true,
  };
};
