import React, { FunctionComponent } from 'react';
import {
  Container,
  Title,
  QuickActionContainer,
  QuickActionContentContainer,
  QuickActionLabel,
  QuickActionArrowRight,
} from './QuickActions.style';
import { QuickAction as QuickActionType } from 'redux/Cause/types';
import { useIntl } from 'react-intl';

interface QuickActionsProps {
  quickActions: QuickActionType[];
}

export const QuickAction: FunctionComponent<{ quickAction: QuickActionType }> = ({
  quickAction,
}) => {
  const onClick = () => {
    window.open(quickAction.link);
  };

  return (
    <QuickActionContainer onClick={onClick}>
      <QuickActionContentContainer>
        <QuickActionLabel>{quickAction.label}</QuickActionLabel>
        <QuickActionArrowRight src="/images/arrowRight.svg" />
      </QuickActionContentContainer>
    </QuickActionContainer>
  );
};

const QuickActions: FunctionComponent<QuickActionsProps> = ({ quickActions }) => {
  const intl = useIntl();

  if (quickActions === undefined || quickActions.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>{intl.formatMessage({ id: 'cause.grow-the-cause' })}</Title>
      {quickActions.map((quickAction: QuickActionType) => (
        <QuickAction
          quickAction={quickAction}
          key={quickAction.id !== undefined ? quickAction.id : ''}
        />
      ))}
    </Container>
  );
};

export default QuickActions;
