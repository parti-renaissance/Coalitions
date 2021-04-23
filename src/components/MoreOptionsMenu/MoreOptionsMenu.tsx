import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { MoreIcon, IconContainer, Menu } from './MoreOptionsMenu.style';
import UnfollowModal from './components/UnfollowModal';
import { MenuItem } from '@material-ui/core';

interface MoreOptionsMenuProps {
  isUnfollowing: boolean;
  unfollow: () => void;
  unfollowModalLabels: {
    description: string;
    confirm: string;
  };
}

const MoreOptionsMenu: FunctionComponent<MoreOptionsMenuProps> = ({
  isUnfollowing,
  unfollow,
  unfollowModalLabels,
}) => {
  const [isUnfollowModalOpened, setIsUnfollowModalOpened] = useState<boolean>(false);
  const [menu, setMenu] = useState<null | HTMLDivElement>(null);

  const openMenu = (event: MouseEvent<HTMLDivElement>) => {
    setMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setMenu(null);
  };

  const closeUnfollowModal = () => {
    setIsUnfollowModalOpened(false);
  };

  const onFollowClick = () => {
    setIsUnfollowModalOpened(true);
    closeMenu();
  };

  return (
    <>
      <IconContainer onClick={openMenu}>
        <MoreIcon src="/images/more_vertical.svg" />
      </IconContainer>
      <Menu anchorEl={menu} keepMounted open={Boolean(menu)} onClose={closeMenu}>
        <MenuItem onClick={onFollowClick}>{unfollowModalLabels.confirm}</MenuItem>
      </Menu>
      <UnfollowModal
        isOpened={isUnfollowModalOpened}
        onClose={closeUnfollowModal}
        isUnfollowing={isUnfollowing}
        unfollow={unfollow}
        labels={unfollowModalLabels}
      />
    </>
  );
};

export default MoreOptionsMenu;
