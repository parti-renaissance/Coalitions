import React, { FunctionComponent } from 'react';
import { MobileShareIcon } from './ShareButton.style';
import { useIntl } from 'react-intl';
import { getIsDesktop, getIsMobile } from 'services/mobile/mobile';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { FullWidthButton } from 'components/Button/Button';

interface ShareButtonProps {
  useMobileIcon?: boolean;
  shareContent: {
    title: string;
    text: string;
  };
}

const ShareButton: FunctionComponent<ShareButtonProps> = ({ shareContent, useMobileIcon }) => {
  // To fix with a global type definition, once behaviour is validated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = navigator;
  const isAbleToUseShareApi = nav?.share !== undefined;
  const isDesktop = getIsDesktop();
  const isMobile = getIsMobile();
  const intl = useIntl();
  const dispatch = useDispatch();

  const share = () => {
    if (isAbleToUseShareApi && !isDesktop) {
      nav.share({ ...shareContent, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        updateSnackbar({
          message: intl.formatMessage({ id: 'share.copy-to-clipboard' }),
          severity: Severity.success,
        }),
      );
    }
  };

  if (isMobile && useMobileIcon) {
    return <MobileShareIcon onClick={share} src="/images/share.svg" />;
  }

  return (
    <FullWidthButton size="small" variant="outlined" color="primary" onClick={share}>
      {intl.formatMessage({ id: 'share.label' })}
    </FullWidthButton>
  );
};

export default ShareButton;
