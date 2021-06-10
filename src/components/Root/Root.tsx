import React, { ReactNode } from 'react';
import { Helmet } from "react-helmet";
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

        <Helmet>
          <title>Pourunecause.fr</title>

          <meta property='og:site_name' content='Pour une cause' />
          <meta property="og:title" content="Faire de nos combats personnels des actions collectives" />
          <meta property="og:description" content="Citoyens, collectifs, associations, nous avons tous à coeur d’agir pour construire un monde meilleur. Nous avons tous des idées, des combats, des causes qui nous sont chers." />
          <meta property="og:image" content="https://pourunecause.fr/images/puc.jpg" />
          <meta property="og:url" content="https://pourunecause.fr/" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="Pour une cause" />
          <meta name="twitter:title" content="Faire de nos combats personnels des actions collectives" />
          <meta name="twitter:description" content="Citoyens, collectifs, associations, nous avons tous à coeur d’agir pour construire un monde meilleur. Nous avons tous des idées, des combats, des causes qui nous sont chers." />
          <meta name="twitter:image" content="https://pourunecause.fr/images/puc.jpg" />
          <meta name="twitter:url" content="https://pourunecause.fr/" />
        </Helmet>

        <RootContainer>
          <Header />
          <PageContent>{children}</PageContent>
          <Footer />
        </RootContainer>
      </ThemeProvider>
    </StylesProvider>
  </IntlProvider>
);

export default Root;
