export const CAUSES_MOCK = [
  {
    followers_count: 12,
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
    followers_count: 1,
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
      followers_count: 12,
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
      followers_count: 1,
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
  statistics: null,
};

export const CAUSE_MOCK = CAUSES_MOCK[0];
