import React, { FunctionComponent } from 'react';
import { Container, NumberOfSelectedCauses, NormalWeight } from './CoalitionCards.style';
import { Coalition } from 'redux/Coalition/types';
import { useIntl } from 'react-intl';
import GenericCoalitionCards from 'components/CoalitionCards';

interface CoalitionCardsProps {
  onCoalitionClick: (coalition: Coalition) => void;
  selectedCoalitionUuids: string[];
}

const CoalitionCards: FunctionComponent<CoalitionCardsProps> = ({
  onCoalitionClick,
  selectedCoalitionUuids,
}) => {
  const intl = useIntl();

  const numberOfSelectedCoalitions =
    selectedCoalitionUuids !== undefined ? selectedCoalitionUuids.length : 0;
  return (
    <Container>
      <NumberOfSelectedCauses>
        {numberOfSelectedCoalitions <= 1
          ? intl.formatMessage(
              { id: 'create_cause.coalitions.zero-or-one-selected-coalition' },
              { numberOfSelectedCoalitions },
            )
          : intl.formatMessage(
              {
                id: `create_cause.coalitions.more-than-one-selected-coalitions`,
              },
              { numberOfSelectedCoalitions },
            )}
        <NormalWeight>{` ${intl.formatMessage({
          id: `create_cause.coalitions.max-number-of-selected-coalitions`,
        })}`}</NormalWeight>
      </NumberOfSelectedCauses>
      <GenericCoalitionCards
        onCoalitionClick={onCoalitionClick}
        selectedCoalitionUuids={selectedCoalitionUuids}
      />
    </Container>
  );
};

export default CoalitionCards;
