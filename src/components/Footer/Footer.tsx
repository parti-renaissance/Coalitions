import React, { FunctionComponent } from 'react';
import { Container, Link, LinkContainer, Separator } from './Footer.style';
import { PATHS } from 'routes';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  return (
    <Container>
      {LEGAL_LINKS.map(({ labelKey, to }, index) => (
        <LinkContainer key={labelKey}>
          {index > 0 ? <Separator>{'•'}</Separator> : undefined}
          <Link key={labelKey} to={to}>
            {`${intl.formatMessage({ id: labelKey })}`}
          </Link>
        </LinkContainer>
      ))}
    </Container>
  );
};

export default Footer;
