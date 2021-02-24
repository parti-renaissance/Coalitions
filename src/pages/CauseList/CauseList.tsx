import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import useSelector from 'redux/useSelector';
import { useFetchCauses } from 'redux/Cause/hooks';
import StyledCauseList from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getCauses } from 'redux/Cause/selectors';

const CauseList: React.FunctionComponent = () => {
  const causes = useSelector(getCauses);
  const [{ loading, error }, doFetchCauses] = useFetchCauses();

  useEffect(() => {
    doFetchCauses();
  }, [doFetchCauses]);

  return (
    <StyledCauseList>
      <FormattedMessage id="cause_list.description" />
      {loading && <Loader />}
      {!loading && error !== undefined && <div>Error fetching causes</div>}
      {!loading && !error && causes.length === 0 && <div>No causes</div>}
      {causes.length > 0 && (
        <ul>
          {causes.map(cause => (
            <Cause key={cause.uuid} cause={cause} />
          ))}
        </ul>
      )}
    </StyledCauseList>
  );
};

export default CauseList;
