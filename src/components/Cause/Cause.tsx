import React from 'react';
import { Cause as CauseType } from 'redux/Cause/types';
import { CauseContainer } from './Cause.style';

interface CauseProps {
  cause: CauseType;
}

const Cause: React.FunctionComponent<CauseProps> = ({ cause }: CauseProps) => {
  return (
    <CauseContainer>
      <div>{cause.name}</div>
      <div>{cause.description}</div>
      <div>Author: {cause.author.first_name}</div>
      <div>Coalition: {cause.coalition.name}</div>
    </CauseContainer>
  );
};

export default Cause;
