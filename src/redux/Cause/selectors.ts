import { RootState } from 'redux/types';

export const getCauses = (store: RootState) => store.cause.causes;
