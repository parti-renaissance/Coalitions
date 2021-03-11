export interface City {
  id: string;
  name: string;
}

export const useCityAutoComplete = (): { cities: City[] } => {
  return {
    cities: [
      { id: '1', name: 'Tours' },
      { id: '2', name: 'Paris' },
      { id: '3', name: 'Rouen' },
    ],
  };
};
