import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { BulletPointsContainer, ListItem } from './OurCommitments.style';

const COMMITMENT_TWO_FIRST_KEYS = ['our_commitments.bullet-one', 'our_commitments.bullet-two'];

const COMMITMENT_TWO_LAST_KEYS = ['our_commitments.bullet-three', 'our_commitments.bullet-four'];

const OurCommitments: FunctionComponent<{}> = () => (
  <>
    <h3>
      <FormattedMessage id="our_commitments.title" />
    </h3>
    <BulletPointsContainer>
      {COMMITMENT_TWO_FIRST_KEYS.map(translationKey => (
        <ListItem key={translationKey}>
          <p>
            <FormattedMessage id={translationKey} />
          </p>
        </ListItem>
      ))}
    </BulletPointsContainer>
    <BulletPointsContainer>
      {COMMITMENT_TWO_LAST_KEYS.map(translationKey => (
        <ListItem key={translationKey}>
          <p>
            <FormattedMessage id={translationKey} />
          </p>
        </ListItem>
      ))}
    </BulletPointsContainer>
  </>
);

export default OurCommitments;
