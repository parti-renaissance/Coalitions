import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { MobileShareIcon, ShareMenu } from './ShareButton.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { getIsDesktop, getIsMobile } from 'services/mobile/mobile';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { FullWidthButton } from 'components/Button/Button';
import { MenuItem } from '@material-ui/core';

interface ShareButtonProps {
  displayMobileIcon?: boolean;
  shareContent: {
    title: string;
    text: string;
  };
}

const ShareButton: FunctionComponent<ShareButtonProps> = ({ shareContent, displayMobileIcon }) => {
  // To fix with a global type definition, once behaviour is validated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = navigator;
  const isAbleToUseShareApi = nav?.share !== undefined;
  const isDesktop = getIsDesktop();
  const isMobile = getIsMobile();
  const intl = useIntl();
  const dispatch = useDispatch();

  const [shareMenu, setShareMenu] = useState<null | HTMLButtonElement | HTMLImageElement>(null);

  const showShareMenu = (event: MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
    setShareMenu(event.currentTarget);
  };

  const closeShareMenu = () => {
    setShareMenu(null);
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      updateSnackbar({
        message: intl.formatMessage({ id: 'share.copy-to-clipboard-success' }),
        severity: Severity.success,
      }),
    );
    closeShareMenu();
  };

  const share = (event: MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
    if (isAbleToUseShareApi && !isDesktop) {
      nav.share({ ...shareContent, url: window.location.href });
    } else {
      showShareMenu(event);
    }
  };

  return (
    <>
      {isMobile && displayMobileIcon ? (
        <MobileShareIcon onClick={share} src="/images/share.svg" />
      ) : (
        <FullWidthButton size="small" variant="outlined" color="primary" onClick={share}>
          {intl.formatMessage({ id: 'share.label' })}
        </FullWidthButton>
      )}
      <ShareMenu
        anchorEl={shareMenu}
        keepMounted
        open={Boolean(shareMenu)}
        onClose={closeShareMenu}
      >
        <MenuItem onClick={copyToClipBoard}>
          <FormattedMessage id="share.copy-to-clipboard" />
        </MenuItem>
      </ShareMenu>
    </>
  );
};

export default ShareButton;
