import { authenticatedApiClient } from 'services/networking/client';
import { useState } from 'react';

type doFetchFollowedCausesType = {
  uuids: string[];
  isUserLoggedIn: boolean;
};

export const useFetchFollowedCauses = () => {
  const [loading, setLoading] = useState(false);

  const doFetchFollowedCauses = async ({ uuids, isUserLoggedIn }: doFetchFollowedCausesType) => {
    if (!isUserLoggedIn) return [];

    setLoading(true);
    try {
      return await authenticatedApiClient.post('v3/causes/followed', { uuids });
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, doFetchFollowedCauses };
};
