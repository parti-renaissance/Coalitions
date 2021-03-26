import React, { FunctionComponent } from 'react';
import { Container, Link } from './Footer.style';
import { PATHS } from 'routes';
import { FormattedMessage } from 'react-intl';

const LEGAL_LINKS: {
  to: string;
  labelKey: string;
}[] = [
  {
    to: PATHS.LEGAL_NOTICE.url(),
    labelKey: 'footer.legal-notice',
  },
  {
    to: PATHS.COOKIES_POLICY.url(),
    labelKey: 'footer.cookies-policy',
  },
  {
    to: PATHS.DATA_PROTECTION_POLICY.url(),
    labelKey: 'footer.data-protection-policy',
  },
  {
    to: PATHS.CHARTER_OF_VALUES.url(),
    labelKey: 'footer.charter-of-values',
  },
];

const Footer: FunctionComponent<{}> = () => {
  return (
    <Container>
      {LEGAL_LINKS.map(({ labelKey, to }) => (
        <Link key={labelKey} to={to}>
          <FormattedMessage id={labelKey} />
        </Link>
      ))}
    </Container>
  );
};

export default Footer;
