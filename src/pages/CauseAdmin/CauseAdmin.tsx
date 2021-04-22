import { QuickActions } from 'components/QuickActions/QuickActions';
import { SendMails } from 'components/SendMails/SendMails';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import UpdateCause from 'components/UpdateCause';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useFeatureToggling } from 'services/useFeatureToggling';
import { CauseAdminContainer, UpdateCauseWrapper, TabWrapper } from './CauseAdmin.style';

interface CausePageNavParams {
  causeId: string;
}

const CauseAdmin: FunctionComponent = () => {
  const { causeId } = useParams<CausePageNavParams>();
  const { isSendMailEnabled } = useFeatureToggling();

  const renderTabPanel = (tabIndex: number) => {
    if (causeId === null) {
      return <></>;
    }
    switch (tabIndex) {
      case 0:
        return (
          <UpdateCauseWrapper>
            <UpdateCause causeId={causeId} />
          </UpdateCauseWrapper>
        );
      case 1:
        return (
          <TabWrapper>
            <QuickActions causeId={causeId} />
          </TabWrapper>
        );
      case 2:
        return (
          <TabWrapper>
            <SendMails causeId={causeId} />
          </TabWrapper>
        );
      default:
        return <></>;
    }
  };

  const getTabsLabel = () => {
    if (isSendMailEnabled) {
      return [
        <FormattedMessage id="admin_cause.update-cause" key="admin_cause.update-cause" />,
        <FormattedMessage id="admin_cause.quick-action" key="admin_cause.quick-action" />,
        <FormattedMessage id="admin_cause.send-mails" key="admin_cause.send-mails" />,
      ];
    }
    return [
      <FormattedMessage id="admin_cause.update-cause" key="admin_cause.update-cause" />,
      <FormattedMessage id="admin_cause.quick-action" key="admin_cause.quick-action" />,
    ];
  };

  return (
    <CauseAdminContainer>
      <TabsWrapper renderTabPanel={renderTabPanel} tabsLabel={getTabsLabel()} />
    </CauseAdminContainer>
  );
};

export default CauseAdmin;
