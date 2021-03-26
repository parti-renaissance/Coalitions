import React, { FunctionComponent } from 'react';
import { Button, Link } from './HeaderButtons.style';
import { useIntl } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { PATHS } from 'routes';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const HeaderButtons: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();

  const onPublishInCreationCause = () => {
    // TODO
  };

  if (isPreview) {
    return (
      <>
        <Link to={PATHS.CREATE_CAUSE.url()}>
          <Button size="small" variant="outlined" color="primary">
            {intl.formatMessage({ id: 'cause_preview.update' })}
          </Button>
        </Link>
        <Button size="small" variant="contained" color="primary" onClick={onPublishInCreationCause}>
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

export default HeaderButtons;
