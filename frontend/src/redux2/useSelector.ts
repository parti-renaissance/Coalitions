import { TypedUseSelectorHook, useSelector as useSelectorGeneric } from 'react-redux';
import { RootState } from 'redux2/types';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorGeneric;

export default useSelector;
