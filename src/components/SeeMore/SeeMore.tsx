import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import { SeeMoreButton } from './SeeMore.style';

export const SeeMore: FunctionComponent<{ text: string }> = ({ text }) => {
  const [displayAll, setDisplayAll] = useState(false);
  const maxChar = getIsMobile() ? 400 : 1200;
  if (displayAll || text.length < maxChar) {
    return <span>{text}</span>;
  }
  return (
    <p>
      {text.substring(0, maxChar)}
      <SeeMoreButton
        onClick={() => {
          setDisplayAll(true);
        }}
      >
        <FormattedMessage id="general.see-more" />
      </SeeMoreButton>
    </p>
  );
};
