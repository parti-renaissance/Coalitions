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
    try {
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        updateSnackbar({
          message: intl.formatMessage({ id: 'share.copy-to-clipboard-success' }),
          severity: Severity.success,
        }),
      );
      closeShareMenu();
    } catch (error) {
      if (error instanceof Error && error.toString().includes('AbortError')) {
        // Do nothing: iOS send this error when the user does not perform the full share process
      }
      if (error instanceof Error && error.toString().includes('NotAllowedError')) {
        dispatch(
          updateSnackbar({
            message: intl.formatMessage({ id: 'share.copy-to-clipboard-not-allowed' }),
            severity: Severity.warning,
          }),
        );
      }
      throw error;
    }
  };

  const share = (event: MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
    if (isAbleToUseShareApi && !isDesktop) {
      nav.share({ ...shareContent, url: window.location.href });
    } else {
      showShareMenu(event);
    }
  };

  const shareLinks = [
    {
      label: <FormattedMessage id="share.facebook" />,
      link: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: <FormattedMessage id="share.twitter" />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href,
      )}&text=${shareContent.text}`,
    },
    {
      label: <FormattedMessage id="share.linkedin" />,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href,
      )}&title=${shareContent.title}`,
    },
    {
      label: <FormattedMessage id="share.whatsapp" />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: <FormattedMessage id="share.telegram" />,
      link: `https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}`,
    },
  ];

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
        {navigator.clipboard?.writeText !== undefined ? (
          <MenuItem component="a" onClick={copyToClipBoard}>
            <FormattedMessage id="share.copy-to-clipboard" />
          </MenuItem>
        ) : null}
        {shareLinks.map(shareLink => (
          <MenuItem
            key={shareLink.link}
            component="a"
            href={shareLink.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shareLink.label}
          </MenuItem>
        ))}
      </ShareMenu>
    </>
  );
};

export default ShareButton;
