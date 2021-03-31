import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { BulletPointsContainer, ListItem, Container } from './OurCommitments.style';

const COMMITMENT_KEYS = [
  'our_commitments.bullet-one',
  'our_commitments.bullet-two',
  'our_commitments.bullet-three',
  'our_commitments.bullet-four',
];

const OurCommitments: FunctionComponent<{}> = () => (
  <Container>
    <h3>
      <FormattedMessage id="our_commitments.title" />
      <BulletPointsContainer>
        {COMMITMENT_KEYS.map(translationKey => (
          <ListItem key={translationKey}>
            <p>
              <FormattedMessage id={translationKey} />
            </p>
          </ListItem>
        ))}
      </BulletPointsContainer>
      <p>
        <FormattedMessage id="our_commitments.last-paragraph" />
      </p>
    </h3>
  </Container>
);

export default OurCommitments;
