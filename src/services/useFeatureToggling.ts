interface FeatureToggles {
  isCauseUpdateEnable: boolean;
  isProfilePageEnalbe: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: false,
      isProfilePageEnalbe: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
    isProfilePageEnalbe: true,
  };
};
