interface FeatureToggles {
  isCauseUpdateEnable: boolean;
}

export const useFeatureToggling = (): FeatureToggles => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      isCauseUpdateEnable: false,
    };
  }

  return {
    isCauseUpdateEnable: true,
  };
};
