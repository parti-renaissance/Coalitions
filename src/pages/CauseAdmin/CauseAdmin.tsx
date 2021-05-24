import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { QuickActions } from 'components/QuickActions/QuickActions';
import { SendMails } from 'components/SendMails/SendMails';
import TabBarAndPanel from 'components/TabBarAndPanel';
import UpdateCause from 'components/UpdateCause';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { useFeatureToggling } from 'services/useFeatureToggling';
import {
  CauseAdminContainer,
  UpdateCauseWrapper,
  TabWrapper,
  TabBarAndPanelWrapper,
} from './CauseAdmin.style';
import Loader from 'components/Loader';
import { CreateEventForm } from 'components/EventForm';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CauseAdmin: FunctionComponent = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { isSendMailEnabled, areEventsEnable } = useFeatureToggling();
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
        case 3:
          return (
            <TabWrapper>
              <CreateEventForm causeId={cause.uuid} />
            </TabWrapper>
          );
        default:
          return <></>;
      }
    },
    [cause],
  );

  const getTabLabels = () => {
    let TAB_LABEL_KEYS = ['admin_cause.update-cause', 'admin_cause.quick-action'];
    if (isSendMailEnabled) {
      TAB_LABEL_KEYS = [...TAB_LABEL_KEYS, 'admin_cause.send-mails'];
    }
    if (areEventsEnable) {
      TAB_LABEL_KEYS = [...TAB_LABEL_KEYS, 'admin_cause.events'];
    }
    return TAB_LABEL_KEYS.map(key => <FormattedMessage id={key} key={key} />);
  };

  if (cause === undefined && loading) {
    return <Loader fullScreen />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <CauseAdminContainer>
      <TabBarAndPanelWrapper>
        <TabBarAndPanel renderTabPanel={renderTabPanel} tabLabels={getTabLabels()} isSticky />
      </TabBarAndPanelWrapper>
    </CauseAdminContainer>
  );
};

export default CauseAdmin;
