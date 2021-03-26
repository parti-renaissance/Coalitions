import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { flattenMessages } from 'services/i18n/intl';
import frMessages from 'translations/fr.json';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';

/* Language polyfills needed for IE11, Edge, Safari 12 & 13 support
https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
*/
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/fr';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/fr';
/* End of language polyfills */

import { PageContent, RootContainer } from './Root.style';
import { theme } from 'stylesheet';

const locales = {
  fr: flattenMessages(frMessages),
};

interface Props {
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children }) => (
  <IntlProvider locale="fr" messages={locales.fr}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RootContainer>
          <Header />
          <PageContent>
            <>
              {children}
              <Footer />
            </>
          </PageContent>
        </RootContainer>
      </ThemeProvider>
    </StylesProvider>
  </IntlProvider>
);

export default Root;
