import React, { FunctionComponent } from 'react';
import { Container } from './FollowTag.style';
import { colorPalette } from 'stylesheet';
import { FormattedMessage } from 'react-intl';

export enum FOLLOW_TAG_TYPE {
  cause = 'cause',
  coalition = 'coalition',
}

const getColorsFromFollowTagType = (
  type?: FOLLOW_TAG_TYPE,
): { color: string; backgroundColor: string } => {
  if (type === FOLLOW_TAG_TYPE.coalition) {
    return {
      color: colorPalette.greyDark,
      backgroundColor: colorPalette.redLight,
    };
  }
  return {
    color: colorPalette.blueCoalition,
    backgroundColor: colorPalette.mintGreen,
  };
};

interface FollowTagProps {
  labelKey: string;
  type?: FOLLOW_TAG_TYPE;
}

const FollowTag: FunctionComponent<FollowTagProps> = ({ labelKey, type }) => {
  const { color, backgroundColor } = getColorsFromFollowTagType(type);
  return (
    <Container color={color} backgroundColor={backgroundColor}>
      <FormattedMessage id={labelKey} />
    </Container>
  );
};

export default FollowTag;
