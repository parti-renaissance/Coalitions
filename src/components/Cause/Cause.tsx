import React, { useState, FunctionComponent } from 'react';
import { SmallButton, DefaultButton } from 'components/Button/Button';
import { Cause as CauseType } from 'redux/Cause/types';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import {
  Author,
  ButtonContainer,
  CauseName,
  StyledCard,
  StyledContent,
  StyledMedia,
  Supported,
} from './Cause.style';

import { FormattedMessage } from 'react-intl';
import { DefaultLink as Link } from 'components/Link/Link';
import AuthorAndSupports from 'components/AuthorAndSupports';
import LoginAndSupportModal from 'components/LoginAndSupportModal';

import { PATHS } from 'routes';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { CoalitionsDisplay } from 'components/CauseDetails/components/CoalitionsDisplay';

interface CauseProps {
  cause: CauseType;
}

const Cause: FunctionComponent<CauseProps> = ({ cause }: CauseProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { loading, followCause } = useCauseFollow(cause.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const onSupportClick = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      setIsModalOpened(true);
    }
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <StyledCard>
        {Boolean(cause.supported) ? (
          <Supported>
            <FormattedMessage id="cause.supported" />
          </Supported>
        ) : null}
        <StyledMedia backgroundImage={cause.image_url} />
        <StyledContent>
          <CoalitionsDisplay cause={cause} small />
          <CauseName>{cause.name}</CauseName>
          {cause.author !== undefined && cause.author !== null ? (
            <Author>
              <FormattedMessage
                id="cause.author"
                values={{
                  firstName: cause.author.first_name,
                  lastNameInitial: cause.author.last_name_initial,
                }}
              />
            </Author>
          ) : null}
          <AuthorAndSupports cause={cause} />
          <ButtonContainer>
            {Boolean(cause.supported) || (
              <SmallButton
                size="small"
                variant="contained"
                color="primary"
                onClick={onSupportClick}
                isLoading={loading}
              >
                <FormattedMessage id="cause.support-button" />
              </SmallButton>
            )}
            <Link to={PATHS.CAUSE.url(cause.uuid)}>
              <DefaultButton size="small" variant="outlined">
                <FormattedMessage id="cause.see-button" />
              </DefaultButton>
            </Link>
          </ButtonContainer>
        </StyledContent>
      </StyledCard>
      <LoginAndSupportModal
        isOpened={isModalOpened}
        onClose={closeModal}
        cause={cause}
        redirectToAfterAuth={PATHS.CAUSE.url(cause.uuid)}
      />
    </>
  );
};

export default Cause;
