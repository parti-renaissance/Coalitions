import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { SmallButton, DefaultButton } from 'components/Button/Button';
import { Cause as CauseType } from 'redux/Cause/types';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import {
  Author,
  ButtonContainer,
  CauseName,
  Container,
  StyledContent,
  StyledMedia,
} from './Cause.style';

import { DefaultLink as Link } from 'components/Link/Link';
import AuthorAndSupports from 'components/AuthorAndSupports';

import { PATHS } from 'routes';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { CoalitionsDisplay } from 'components/CauseDetails/components/CoalitionsDisplay';
import FollowTag from 'components/FollowTag/FollowTag';
import { useDispatch } from 'react-redux';
import { openCauseSupportModal } from 'redux/Cause';

interface CauseProps {
  cause: CauseType;
}

const Cause: FunctionComponent<CauseProps> = ({ cause }: CauseProps) => {
  const dispatch = useDispatch();
  const { loading, followCause } = useCauseFollow(cause.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const history = useHistory();

  const onSupportClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (isUserLoggedIn) {
      followCause();
    } else {
      dispatch(openCauseSupportModal(cause !== undefined ? cause : null));
    }
  };

  return (
    <>
      <Container
        onClick={() => {
          history.push(PATHS.CAUSE.url(cause.slug));
        }}
      >
        {Boolean(cause.supported) ? <FollowTag labelKey="cause.supported" /> : null}
        <StyledMedia backgroundImage={cause.image_url} />
        <StyledContent>
          <CoalitionsDisplay cause={cause} small />
          <CauseName>{cause.name}</CauseName>
          <Author>
            {cause.author !== undefined && cause.author !== null ? (
              <FormattedMessage
                id="cause.author"
                values={{
                  firstName: cause.author.first_name,
                  lastName:
                    isUserLoggedIn && cause.author.last_name !== undefined
                      ? cause.author.last_name
                      : cause.author.last_name_initial,
                }}
              />
            ) : (
              <FormattedMessage id="cause.anonymous-author" />
            )}
          </Author>
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
            <Link to={PATHS.CAUSE.url(cause.slug)}>
              <DefaultButton size="small" variant="outlined">
                <FormattedMessage id="cause.see-button" />
              </DefaultButton>
            </Link>
          </ButtonContainer>
        </StyledContent>
      </Container>
    </>
  );
};

export default Cause;
