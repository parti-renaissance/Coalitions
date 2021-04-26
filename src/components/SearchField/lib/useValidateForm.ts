export interface SearchFieldFormValues {
  searchText: string;
}

type ErrorForm = {
  searchText?: string;
};

export const useValidateForm = () => {
  const validateForm = ({ searchText }: SearchFieldFormValues) => {
    // TODO
    console.log({ searchText });

    return {} as ErrorForm;
  };

  return { validateForm };
};
