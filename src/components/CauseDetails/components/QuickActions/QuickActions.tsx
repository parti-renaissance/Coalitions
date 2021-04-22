import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getCauseQuickActions } from 'redux/Cause/selectors';
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
  causeId: string;
}

const QuickAction: FunctionComponent<{ quickAction: QuickActionType }> = ({ quickAction }) => {
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

const QuickActions: FunctionComponent<QuickActionsProps> = ({ causeId }) => {
  const quickActions = useSelector(getCauseQuickActions(causeId));
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
