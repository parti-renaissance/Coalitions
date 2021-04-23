import React, { FunctionComponent } from 'react';
import { Image, Content, Container, Title } from './SuccessModalContent.style';
import { useIntl } from 'react-intl';

interface SuccessModalContentProps {
  titleKey: string;
  contentKey?: string;
  imageUrl: string;
}

const SuccessModalContent: FunctionComponent<SuccessModalContentProps> = ({
  titleKey,
  contentKey,
  imageUrl,
}) => {
  const intl = useIntl();

  return (
    <Container>
      <Image src={imageUrl} />
      <Title>{intl.formatMessage({ id: titleKey })}</Title>
      {contentKey !== undefined ? (
        <Content>{intl.formatMessage({ id: contentKey })}</Content>
      ) : null}
    </Container>
  );
};

export default SuccessModalContent;
