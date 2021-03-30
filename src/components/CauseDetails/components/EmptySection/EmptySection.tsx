import React, { FunctionComponent } from 'react';
import { Container, Image, Text } from './EmptySection.style';
import { FormattedMessage } from 'react-intl';

interface EmptySectionProps {
  imageSrc: string;
  labelKey: string;
}

const EmptySection: FunctionComponent<EmptySectionProps> = ({ imageSrc, labelKey }) => (
  <Container>
    <Image src={imageSrc} />
    <Text>
      <FormattedMessage id={labelKey} />
    </Text>
  </Container>
);

export default EmptySection;
