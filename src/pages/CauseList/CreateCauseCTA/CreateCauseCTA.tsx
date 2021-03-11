import React from 'react';
import { useSelector } from 'react-redux';
import { getNumberOfCauses } from 'redux/Cause/selectors';
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

export const CreateCauseCTA: React.FunctionComponent<{ displayLinkToCauseList?: boolean }> = ({
  displayLinkToCauseList = false,
}) => {
  const numberOfCauses = useSelector(getNumberOfCauses);

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
              numberOfCauses,
            }}
          />
        </DescriptionText>
        <CTAButton variant="contained" color="primary">
          <FormattedMessage id="cause-cta.cause-creation" />
        </CTAButton>
        {displayLinkToCauseList === true && (
          <Link to={PATHS.HOME.url()}>
            <CauseListButton variant="contained">
              <FormattedMessage
                id="cause-cta.go-to-cause-list"
                values={{
                  numberOfCauses,
                }}
              />
            </CauseListButton>
          </Link>
        )}
      </CTABlock>
    </CTAContainer>
  );
};
