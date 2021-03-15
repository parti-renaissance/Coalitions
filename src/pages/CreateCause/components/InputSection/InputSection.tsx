import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Title, TipsContainer, Tips } from './InputSection.style';

interface InputSectionProps {
  title: string;
  tips: string;
}

const InputSection: FunctionComponent<InputSectionProps> = ({ title, tips, children }) => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <TipsContainer>
        <Tips>{intl.formatMessage({ id: 'create_cause.tips' })}</Tips>
        {` ${tips}`}
      </TipsContainer>
    </Container>
  );
};

export default InputSection;
