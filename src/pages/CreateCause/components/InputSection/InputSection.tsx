import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Title, TipsContainer, Tips } from './InputSection.style';

interface InputSectionProps {
  title: string;
  tips: string;
  BottomChildren?: FunctionComponent<{}>;
}

const InputSection: FunctionComponent<InputSectionProps> = ({
  title,
  tips,
  BottomChildren,
  children,
}) => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <TipsContainer withBottomTop={children !== undefined}>
        <Tips>{intl.formatMessage({ id: 'create_cause.tips' })}</Tips>
        {` ${tips}`}
      </TipsContainer>
      {BottomChildren !== undefined ? <BottomChildren /> : null}
    </Container>
  );
};

export default InputSection;
