import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCauseStatistics } from 'redux/Cause/selectors';
import { DefaultLink as Link } from 'components/Link/Link';
import {
  CTABlock,
  CTAButton,
  CTAContainer,
  DescriptionText,
  HeadSentence,
  CauseListButton,
} from './CreateCauseCTA.style';

import { PATHS } from 'routes';
import { FormattedMessage } from 'react-intl';
import { useFetchCauseStatistics } from './services';

const CreateCauseCTA: React.FunctionComponent<{ displayLinkToCauseList?: boolean }> = ({
  displayLinkToCauseList = false,
}) => {
  const { fetchCauseStatistics } = useFetchCauseStatistics();
  const causeStatistics = useSelector(getCauseStatistics);

  useEffect(() => {
    fetchCauseStatistics();
  }, [fetchCauseStatistics]);

  return (
    <CTAContainer>
      <CTABlock>
        <HeadSentence>
          <FormattedMessage id="cause-cta.title" />
        </HeadSentence>
        <DescriptionText>
          <FormattedMessage
            id="cause-cta.description"
            values={{
              numberOfCauses: causeStatistics !== null ? causeStatistics.total : '',
            }}
          />
        </DescriptionText>
        <Link to={PATHS.OUR_MISSION.url()}>
          <CTAButton variant="contained" color="primary">
            <FormattedMessage id="cause-cta.cause-creation" />
          </CTAButton>
        </Link>
        {displayLinkToCauseList === true && (
          <Link to={PATHS.CAUSE_LIST.url()}>
            <CauseListButton variant="contained">
              <FormattedMessage
                id="cause-cta.go-to-cause-list"
                values={{
                  numberOfCauses: causeStatistics !== null ? causeStatistics.total : '',
                }}
              />
            </CauseListButton>
          </Link>
        )}
      </CTABlock>
    </CTAContainer>
  );
};

export default CreateCauseCTA;
