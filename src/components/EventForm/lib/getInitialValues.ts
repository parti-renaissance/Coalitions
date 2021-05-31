import { CreateEventType, EventType, UpdatedEventType } from 'redux/Events/types';

export const getInitialValues = ({
  causeId,
  initialEvent,
}: {
  causeId: string;
  initialEvent?: EventType;
}): CreateEventType | UpdatedEventType => {
  if (initialEvent === undefined) {
    return {
      name: '',
      mode: 'meeting',
      address: '',
      visioUrl: '',
      beginAt: '',
      finishAt: '',
      categoryId: '',
      description: '',
      causeId,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      postalCode: '',
      cityName: '',
      country: '',
    };
  }

  const {
    uuid,
    name,
    mode,
    visioUrl,
    beginAt,
    finishAt,
    description,
    category,
    causeId: initialEventCauseId,
    timeZone,
    postAddress,
  } = initialEvent;

  return {
    uuid,
    name,
    mode,
    visioUrl,
    beginAt,
    finishAt,
    categoryId: category.uuid,
    description,
    causeId: initialEventCauseId,
    timeZone,
    address: postAddress !== undefined ? postAddress.address : '',
    postalCode: postAddress !== undefined ? postAddress.postalCode : '',
    cityName: postAddress !== undefined ? postAddress.cityName : '',
    country: postAddress !== undefined ? postAddress.country : '',
  };
};
