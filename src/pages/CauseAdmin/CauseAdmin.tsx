import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { QuickActions } from 'components/QuickActions/QuickActions';
import { SendMails } from 'components/SendMails/SendMails';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import UpdateCause from 'components/UpdateCause';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { useFeatureToggling } from 'services/useFeatureToggling';
import { CauseAdminContainer, UpdateCauseWrapper, TabWrapper } from './CauseAdmin.style';
import Loader from 'components/Loader';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CauseAdmin: FunctionComponent = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { isSendMailEnabled } = useFeatureToggling();
  const cause = useSelector(getCause(causeIdOrSlug));
  const { fetchCause, loading } = useFetchOneCause(causeIdOrSlug);

  useEffect(() => {
    fetchCause(true);
  }, [fetchCause]);

  const renderTabPanel = useCallback(
    (tabIndex: number) => {
      if (cause === undefined) {
        return <></>;
      }

      switch (tabIndex) {
        case 0:
          return (
            <UpdateCauseWrapper>
              <UpdateCause cause={cause} />
            </UpdateCauseWrapper>
          );
        case 1:
          return (
            <TabWrapper>
              <QuickActions cause={cause} />
            </TabWrapper>
          );
        case 2:
          return (
            <TabWrapper>
              <SendMails causeId={cause.uuid} />
            </TabWrapper>
          );
        default:
          return <></>;
      }
    },
    [cause],
  );

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

  if (cause === undefined && loading) {
    return <Loader />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <CauseAdminContainer>
      <TabsWrapper renderTabPanel={renderTabPanel} tabsLabel={getTabsLabel()} />
    </CauseAdminContainer>
  );
};

export default CauseAdmin;
