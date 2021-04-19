import React, { FunctionComponent, useEffect } from 'react';
import { useFetchQuickActions } from 'redux/Cause/hooks/useFetchQuickActions';
import { useSelector } from 'react-redux';
import { getCauseQuickActions } from 'redux/Cause/selectors';
import Loader from 'components/Loader';
import {
  Title,
  QuickActionContainer,
  QuickActionContentContainer,
  QuickActionLabel,
  QuickActionArrowRight,
} from './QuickActions.style';
import { QuickAction } from 'redux/Cause/types';
import { useIntl } from 'react-intl';

interface QuickActionsProps {
  causeId: string;
}

const renderQuickAction = (quickAction: QuickAction) => (
  <QuickActionContainer>
    <QuickActionContentContainer>
      <QuickActionLabel>{quickAction.label}</QuickActionLabel>
      <QuickActionArrowRight src="/images/arrowRight.svg" />
    </QuickActionContentContainer>
  </QuickActionContainer>
);

const QuickActions: FunctionComponent<QuickActionsProps> = ({ causeId }) => {
  const quickActions = useSelector(getCauseQuickActions(causeId));
  const { loading, fetchQuickActions } = useFetchQuickActions(causeId);
  const intl = useIntl();

  useEffect(() => {
    fetchQuickActions();
  }, [fetchQuickActions]);

  if (loading && (quickActions === undefined || quickActions.length === 0)) {
    return <Loader />;
  }

  if (quickActions === undefined || quickActions.length === 0) {
    return null;
  }

  return (
    <div>
      <Title>{intl.formatMessage({ id: 'cause.grow-the-cause' })}</Title>
      {quickActions.map(renderQuickAction)}
    </div>
  );
};

export default QuickActions;
