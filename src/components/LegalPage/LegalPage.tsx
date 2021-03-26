import React, { FunctionComponent } from 'react';
import { Container, Title, SubTitle, ArticleTitle, Text } from './LegalPage.style';
import { FormattedMessage } from 'react-intl';

export enum ContentType {
  SUB_TITLE = 'SUB_TITLE',
  ARTICLE_TITLE = 'ARTICLE_TITLE',
  TEXT = 'TEXT',
}

type Content = {
  type: ContentType;
  textKey: string;
};

interface LegalPageProps {
  titleKey: string;
  contents: Content[];
}

const LegalPage: FunctionComponent<LegalPageProps> = ({ titleKey, contents }) => {
  const renderContent = ({ type, textKey }: Content) => {
    let Container = null;

    switch (type) {
      case ContentType.SUB_TITLE:
        Container = SubTitle;
        break;
      case ContentType.ARTICLE_TITLE:
        Container = ArticleTitle;
        break;
      case ContentType.TEXT:
        Container = Text;
        break;
      default:
        break;
    }

    if (Container === null) {
      return null;
    }

    return (
      <Container>
        <FormattedMessage id={textKey} />
      </Container>
    );
  };

  return (
    <Container>
      <Title>
        <FormattedMessage id={titleKey} />
      </Title>
      {contents.map(renderContent)}
    </Container>
  );
};

export default LegalPage;
