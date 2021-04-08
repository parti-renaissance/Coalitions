import React, { FunctionComponent } from 'react';
import { Container, NumberOfSelectedCauses, Bold } from './CoalitionCards.style';
import { Coalition } from 'redux/Coalition/types';
import { useIntl } from 'react-intl';
import GenericCoalitionCards from 'components/CoalitionCards';

interface CoalitionCardsProps {
  onCoalitionClick?: (coalition: Coalition) => void;
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
      {onCoalitionClick !== undefined && (
        <NumberOfSelectedCauses>
          <Bold>
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
          </Bold>
          {` ${intl.formatMessage({
            id: `create_cause.coalitions.max-number-of-selected-coalitions`,
          })}`}
        </NumberOfSelectedCauses>
      )}
      <GenericCoalitionCards
        onCoalitionClick={onCoalitionClick}
        selectedCoalitionUuids={selectedCoalitionUuids}
      />
    </Container>
  );
};

export default CoalitionCards;
