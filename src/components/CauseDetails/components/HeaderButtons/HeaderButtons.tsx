import React, { FunctionComponent } from 'react';
import { Button, Link, DesktopContainer } from './HeaderButtons.style';
import { useIntl } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { PATHS } from 'routes';
import { Container as StickyMobileButtonsContainer } from 'components/FixedBottomButton/FixedBottomButton.style';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
  isMobile?: boolean;
}

const HeaderButtons: FunctionComponent<HeaderProps> = ({
  cause,
  onSupport,
  isSupporting,
  isMobile,
}) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();

  const onPublishInCreationCause = () => {
    // TODO
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
          >
            {intl.formatMessage({ id: 'cause_preview.publish' })}
          </Button>
        </>
      );
    }

    if (!isSupported) {
      return (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onSupport}
          isLoading={isSupporting}
        >
          {intl.formatMessage({ id: 'cause.support-button' })}
        </Button>
      );
    }

    return null;
  };

  if (!isPreview && isSupported) {
    return null;
  }

  const Container = isMobile === true ? StickyMobileButtonsContainer : DesktopContainer;
  return <Container>{renderContent()}</Container>;
};

export default HeaderButtons;
