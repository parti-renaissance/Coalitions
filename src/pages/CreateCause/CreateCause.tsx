import React, { FunctionComponent } from 'react';
import useSelector from 'redux/useSelector';
import { useDispatch } from 'react-redux';
import { updateInCreationCause } from 'redux/Cause/slice';
import { useHistory } from 'react-router';
import { PATHS } from 'routes';
import { getInCreationCause } from 'redux/Cause/selectors';
import CauseForm from 'components/CauseForm';
import { InCreationCause } from 'redux/Cause/types';

const CreateCause: FunctionComponent = () => {
  const inCreationCause = useSelector(getInCreationCause);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitBegin = (cause: InCreationCause) => {
    dispatch(updateInCreationCause(cause));
  };

  const onSubmit = () => {
    history.push(PATHS.CAUSE_PREVIEW.url());
  };

  return (
    <CauseForm onSubmitBegin={onSubmitBegin} onSubmit={onSubmit} initialCause={inCreationCause} />
  );
};

export default CreateCause;
