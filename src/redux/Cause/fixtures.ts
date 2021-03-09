export const CAUSES_MOCK = [
  {
    author: {
      first_name: 'Charles',
      last_name_initial: 'G',
      uuid: 'authorUuid',
    },
    coalition: {
      name: 'Coalition #1',
      uuid: 'coalitionUuid',
    },
    name: 'Cause #1',
    description: 'Description de la première des causes',
    uuid: 'cause1Uuid',
    image_url: 'imageUrl',
  },
  {
    author: {
      first_name: 'Georges',
      last_name_initial: 'P',
      uuid: 'authorUuid',
    },
    coalition: {
      name: 'Coalition #2',
      uuid: 'coalitionUuid',
    },
    name: 'Cause #2',
    description: 'Description de la seconde des causes',
    uuid: 'cause2Uuid',
    image_url: 'imageUrl',
  },
];

export const CAUSES_MOCK_STORE = {
  causes: {
    cause1Uuid: {
      author: {
        first_name: 'Charles',
        last_name_initial: 'G',
        uuid: 'authorUuid',
      },
      coalition: {
        name: 'Coalition #1',
        uuid: 'coalitionUuid',
      },
      name: 'Cause #1',
      description: 'Description de la première des causes',
      uuid: 'cause1Uuid',
      image_url: 'imageUrl',
    },
    cause2Uuid: {
      author: {
        first_name: 'Georges',
        last_name_initial: 'P',
        uuid: 'authorUuid',
      },
      coalition: {
        name: 'Coalition #2',
        uuid: 'coalitionUuid',
      },
      name: 'Cause #2',
      description: 'Description de la seconde des causes',
      uuid: 'cause2Uuid',
      image_url: 'imageUrl',
    },
  },
  ids: ['cause1Uuid', 'cause2Uuid'],
};

export const CAUSE_MOCK = CAUSES_MOCK[0];
