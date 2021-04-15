import { QuickActions } from 'components/QuickActions/QuickActions';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import UpdateCause from 'pages/UpdateCause';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { CauseAdminContainer } from './CauseAdmin.style';

const CauseAdmin: FunctionComponent = () => {
  const renderTabPanel = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return <UpdateCause />;
      case 1:
        return <QuickActions />;
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
