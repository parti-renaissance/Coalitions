import React, { FunctionComponent } from 'react';
import { Container, Title, SubTitle, ArticleTitle, Text, SubSubTitle } from './LegalPage.style';
import { FormattedMessage } from 'react-intl';

export enum ContentType {
  SUB_TITLE = 'SUB_TITLE',
  SUB_SUB_TITLE = 'SUB_SUB_TITLE',
  ARTICLE_TITLE = 'ARTICLE_TITLE',
  TEXT = 'TEXT',
}

type Content = {
  type: ContentType;
  text: string;
};

interface LegalPageProps {
  titleKey: string;
  contents: Content[];
}

const LegalPage: FunctionComponent<LegalPageProps> = ({ titleKey, contents }) => {
  const renderContent = ({ type, text }: Content) => {
    let ContentContainer = null;

    switch (type) {
      case ContentType.SUB_TITLE:
        ContentContainer = SubTitle;
        break;
      case ContentType.SUB_SUB_TITLE:
        ContentContainer = SubSubTitle;
        break;
      case ContentType.ARTICLE_TITLE:
        ContentContainer = ArticleTitle;
        break;
      case ContentType.TEXT:
        ContentContainer = Text;
        break;
      default:
        break;
    }

    if (ContentContainer === null) {
      return null;
    }

    return <ContentContainer>{text}</ContentContainer>;
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
