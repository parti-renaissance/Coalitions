import React, { FunctionComponent } from 'react';
import { Button, Link, DesktopContainer } from './HeaderButtons.style';
import { useIntl } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { PATHS } from 'routes';
import { Container as StickyMobileButtonsContainer } from 'components/FixedBottomButton/FixedBottomButton.style';
import { usePublishCause } from 'redux/Cause/hooks/usePublishCause';
import { useCauseOwner } from 'redux/Cause/hooks/useCauseOwner';
import { useFeatureToggling } from 'services/useFeatureToggling';
import { useHistory } from 'react-router';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  onShare?: () => void;
  isSupporting?: boolean;
  isMobile?: boolean;
}

const HeaderButtons: FunctionComponent<HeaderProps> = ({
  cause,
  onSupport,
  onShare,
  isSupporting,
  isMobile,
}) => {
  const history = useHistory();
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();
  const { loading, publishCause } = usePublishCause();
  const isCauseOwner = useCauseOwner(cause);
  const { isCauseUpdateEnable } = useFeatureToggling();

  const onPublishInCreationCause = () => {
    publishCause();
  };

  const updateCause = () => {
    history.push({
      pathname: PATHS.UPDATE_CAUSE.url(),
      search: `?causeId=${(cause as Cause).uuid}`,
    });
  };

  const renderContent = () => {
    if (isPreview) {
      return (
        <>
          <Link to={PATHS.CREATE_CAUSE.url()}>
            <Button size="small" variant="outlined" color="primary">
              {intl.formatMessage({ id: 'cause_preview.update' })}
            </Button>
          </Link>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onPublishInCreationCause}
            isLoading={loading}
          >
            {intl.formatMessage({ id: 'cause_preview.publish' })}
          </Button>
        </>
      );
    }

    return (
      <>
        {!isSupported ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onSupport}
            isLoading={isSupporting}
          >
            {intl.formatMessage({ id: 'cause.support-button' })}
          </Button>
        ) : isCauseOwner && isCauseUpdateEnable ? (
          <Button size="small" variant="contained" color="primary" onClick={updateCause}>
            {intl.formatMessage({ id: 'cause.update' })}
          </Button>
        ) : null}
        {isMobile || (
          <Button size="small" variant="outlined" color="primary" onClick={onShare}>
            {intl.formatMessage({ id: 'cause.share-button' })}
          </Button>
        )}
      </>
    );
  };

  const Container = isMobile === true ? StickyMobileButtonsContainer : DesktopContainer;
  return <Container>{renderContent()}</Container>;
};

export default HeaderButtons;
