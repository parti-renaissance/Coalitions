import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import { EventType } from 'redux/Events/types';
import { Container, Icon, Label } from './EventParticipateButton.style';
import {
  getEventParticipateButtonConfig,
  EventParticipateButtonType,
} from './lib/getEventParticipateButtonConfig';
import { FullWidthButton, SmallButton } from 'components/Button/Button';

interface EventParticipateButtonProps {
  type: EventParticipateButtonType;
  event: EventType;
}

const EventParticipateButton: FunctionComponent<EventParticipateButtonProps> = ({
  type,
  event,
}) => {
  const [isHover, setIsHover] = useState(false);
  const intl = useIntl();

  const getSetIsHover = (hover: boolean) => () => {
    setIsHover(hover);
  };

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const SubContainer = type === 'card' ? SmallButton : FullWidthButton;
  const { labelKey, customStyle, iconSrc } = getEventParticipateButtonConfig({
    event,
    type,
    isHover,
  });

  return (
    <Container
      width={type === 'modal' ? '100%' : 'unset'}
      customStyle={customStyle}
      onMouseEnter={getSetIsHover(true)}
      onMouseLeave={getSetIsHover(false)}
    >
      <SubContainer onClick={onClick}>
        {iconSrc !== undefined ? <Icon src={iconSrc} /> : null}
        {labelKey !== undefined ? (
          <Label withMarginLeft={iconSrc !== undefined}>
            {intl.formatMessage({ id: labelKey })}
          </Label>
        ) : null}
      </SubContainer>
    </Container>
  );
};

export default EventParticipateButton;
