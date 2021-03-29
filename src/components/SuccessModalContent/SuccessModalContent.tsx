import React, { FunctionComponent } from 'react';
import { Image, Content, Container } from './SuccessModalContent.style';
import { useIntl } from 'react-intl';
import { Title } from 'components/Modal/Modal.style';

interface SuccessModalContentProps {
  titleKey: string;
  contentKey: string;
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
      <Content>{intl.formatMessage({ id: contentKey })}</Content>
    </Container>
  );
};

export default SuccessModalContent;
