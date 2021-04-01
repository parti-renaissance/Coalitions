import React, { FunctionComponent } from 'react';
import { Container, Link, LinkContainer, Separator, ExternalLink } from './Footer.style';
import { PATHS } from 'routes';
import { useIntl } from 'react-intl';

const LEGAL_LINKS: {
  to: string;
  labelKey: string;
  isExternalLink?: boolean;
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
    to: 'https://storage.googleapis.com/pourunecause/charte_des_valeurs.pdf',
    labelKey: 'footer.charter-of-values',
    isExternalLink: true,
  },
];

const Footer: FunctionComponent<{}> = () => {
  const intl = useIntl();
  return (
    <Container>
      {LEGAL_LINKS.map(({ labelKey, to, isExternalLink }, index) => {
        const label = intl.formatMessage({ id: labelKey });
        return (
          <LinkContainer key={labelKey}>
            {index > 0 ? <Separator>{'•'}</Separator> : undefined}
            {isExternalLink !== undefined && isExternalLink ? (
              <ExternalLink href={to} target="_blank">
                {label}
              </ExternalLink>
            ) : (
              <Link key={labelKey} to={to} href={to}>
                {label}
              </Link>
            )}
          </LinkContainer>
        );
      })}
    </Container>
  );
};

export default Footer;
