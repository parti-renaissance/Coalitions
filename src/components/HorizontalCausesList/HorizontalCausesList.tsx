import React, { FunctionComponent } from 'react';
import {
  Header,
  SubContainer,
  SeeAllButton,
  EmptyDiv,
  CauseWrapper,
} from './HorizontalCausesList.style';
import Cause from 'components/Cause';
import { useIntl } from 'react-intl';
import { PATHS } from 'routes';
import Loader from 'components/Loader';
import { Cause as CauseType } from 'redux/Cause/types';

interface HorizontalCausesListProps {
  causes: CauseType[];
  isLoading: boolean;
}

const HorizontalCausesList: FunctionComponent<HorizontalCausesListProps> = ({
  causes,
  isLoading,
}) => {
  const intl = useIntl();

  if (!isLoading && causes.length === 0) {
    return null;
  }

  return (
    <div>
      <Header>
        <h3>{intl.formatMessage({ id: 'horizontal_causes_list.title' })}</h3>
        <SeeAllButton to={PATHS.CAUSE_LIST.url()}>
          {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
        </SeeAllButton>
      </Header>
      {isLoading && causes.length === 0 ? (
        <Loader />
      ) : (
        <SubContainer>
          {causes.map(cause => (
            <CauseWrapper key={cause.uuid}>
              <Cause cause={cause} />
            </CauseWrapper>
          ))}
          <EmptyDiv />
        </SubContainer>
      )}
    </div>
  );
};

export default HorizontalCausesList;
