import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import { Container, SeeMoreButton } from './SeeMore.style';

export const SeeMore: FunctionComponent<{ text: string }> = ({ text }) => {
  const [displayAll, setDisplayAll] = useState(false);
  const maxChar = getIsMobile() ? 400 : 1200;

  if (displayAll || text.length < maxChar) {
    return <Container>{text}</Container>;
  }

  return (
    <Container>
      {text.substring(0, maxChar)}
      <SeeMoreButton
        onClick={() => {
          setDisplayAll(true);
        }}
      >
        <FormattedMessage id="general.see-more" />
      </SeeMoreButton>
    </Container>
  );
};
