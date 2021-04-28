import React, { FunctionComponent, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { useFetchCauses, SortOptions } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { useHistory } from 'react-router';

interface HorizontalCausesListProps {
  coalitionId?: string;
}

const HorizontalCausesList: FunctionComponent<HorizontalCausesListProps> = ({ coalitionId }) => {
  const intl = useIntl();
  const causes = useSelector(getAllCauses);
  const { loading: isFetchingCauses, fetchFirstPage: fetchCauses } = useFetchCauses();
  const history = useHistory();

  useEffect(() => {
    fetchCauses({
      coalitionIds: coalitionId !== undefined ? [coalitionId] : [],
      searchText: '',
      sort: SortOptions.moreSupported,
    });
  }, [fetchCauses, coalitionId]);

  const onSeeAllClick = () => {
    if (coalitionId !== undefined) {
      history.push({ pathname: PATHS.CAUSE_LIST.url(), search: `?coalitionId=${coalitionId}` });
    } else {
      history.push(PATHS.CAUSE_LIST.url());
    }
  };

  if (!isFetchingCauses && causes.length === 0) {
    return null;
  }

  return (
    <div>
      <Header>
        <h3>{intl.formatMessage({ id: 'horizontal_causes_list.title' })}</h3>
        <SeeAllButton onClick={onSeeAllClick}>
          {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
        </SeeAllButton>
      </Header>
      {isFetchingCauses && causes.length === 0 ? (
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
