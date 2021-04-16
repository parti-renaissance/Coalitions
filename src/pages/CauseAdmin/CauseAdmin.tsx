import { QuickActions } from 'components/QuickActions/QuickActions';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import { useLocation } from 'react-router';
import UpdateCause from 'pages/UpdateCause';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { CauseAdminContainer } from './CauseAdmin.style';

const CauseAdmin: FunctionComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const causeId = params.get('causeId');

  const renderTabPanel = (tabIndex: number) => {
    if (causeId === null) {
      return <></>;
    }
    switch (tabIndex) {
      case 0:
        return <UpdateCause />;
      case 1:
        return <QuickActions causeId={causeId} />;
      default:
        return <></>;
    }
  };

  return (
    <CauseAdminContainer>
      <TabsWrapper
        renderTabPanel={renderTabPanel}
        tabsLabel={[
          <FormattedMessage id="admin_cause.update-cause" key="admin_cause.update-cause" />,
          <FormattedMessage id="admin_cause.quick-action" key="admin_cause.quick-action" />,
        ]}
      />
    </CauseAdminContainer>
  );
};

export default CauseAdmin;
