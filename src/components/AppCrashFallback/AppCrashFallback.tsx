import React, { FunctionComponent } from 'react';
import * as Sentry from '@sentry/browser';
import {
  Wrapper,
  Container,
  Button,
  SubContainer,
  Image,
  Description,
} from './AppCrashFallback.style';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { IntlProvider } from 'react-intl';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { flattenMessages } from 'services/i18n/intl';
import frMessages from 'translations/fr.json';
import { theme } from 'stylesheet';

const locales = {
  fr: flattenMessages(frMessages),
};

/**
 * Error page inspiration https://medium.com/design-ideas-thoughts/designing-error-pages-8d82e16e3472
 */

export interface IFallbackProps {
  eventId: string;
}

const reportDialog = (eventId: string) => () => Sentry.showReportDialog({ eventId });

const AppCrashFallback: FunctionComponent<IFallbackProps> = ({ eventId }) => {
  const goToHomePage = () => {
    window.location.href = PATHS.HOME.url();
  };

  return (
    <IntlProvider locale="fr" messages={locales.fr}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Container>
              <div />
              <SubContainer>
                <Image src="/images/appCrashFallback.svg" />
                <Description>
                  <FormattedMessage id="app_crash_fallback.description-title" />
                  <br />
                  <FormattedMessage id="app_crash_fallback.description" />
                </Description>
              </SubContainer>
              <div>
                <Button size="small" variant="contained" color="primary" onClick={goToHomePage}>
                  <FormattedMessage id="app_crash_fallback.go-to-home-page" />
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={reportDialog(eventId)}
                >
                  <FormattedMessage id="app_crash_fallback.report-dialog" />
                </Button>
              </div>
            </Container>
          </Wrapper>
        </ThemeProvider>
      </StylesProvider>
    </IntlProvider>
  );
};

export default AppCrashFallback;
