import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Title, TipsContainer, Tips } from './InputSection.style';

interface InputSectionProps {
  title: string;
  tips: string;
  BottomChildren?: FunctionComponent<{}>;
  hideTips?: boolean;
}

const InputSection: FunctionComponent<InputSectionProps> = ({
  title,
  tips,
  BottomChildren,
  children,
  hideTips,
}) => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <TipsContainer hasMiddleChildren={children !== undefined}>
        {!Boolean(hideTips) ? (
          <>
            <Tips>{intl.formatMessage({ id: 'create_cause.tips' })}</Tips>{' '}
          </>
        ) : null}
        {tips}
      </TipsContainer>
      {BottomChildren !== undefined ? <BottomChildren /> : null}
    </Container>
  );
};

export default InputSection;
