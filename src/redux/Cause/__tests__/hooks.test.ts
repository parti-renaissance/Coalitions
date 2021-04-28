import * as useTypedAsyncFn from 'redux/useTypedAsyncFn';
import { act, renderHook } from '@testing-library/react-hooks';
import { CAUSES_MOCK } from '../fixtures';
import { useFetchCauses } from '../hooks/useFetchCauses';
import * as hooks from '../hooks/useFetchFollowedCauses';
import { SortOptions } from 'redux/Cause/hooks/useFetchCauses';

const doFetchCauses = jest
  .fn()
  .mockReturnValue({ items: CAUSES_MOCK, metadata: { total_items: 12, last_page: 1 } });

jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: jest.fn(),
  }),
}));

const doFetchFollowedCauses = jest.fn().mockReturnValue([CAUSES_MOCK[1].uuid]);
jest
  .spyOn(useTypedAsyncFn, 'useTypedAsyncFn')
  .mockImplementation(() => [{ loading: false, error: undefined }, doFetchCauses]);

jest.spyOn(hooks, 'useFetchFollowedCauses').mockImplementation(() => {
  return { loading: false, error: undefined, doFetchFollowedCauses };
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

describe('useFetchCauses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function to load first page', async () => {
    const { result } = renderHook(() => useFetchCauses());
    void (await act(() =>
      result.current.fetchFirstPage({
        coalitionIds: [],
        searchText: '',
        sort: SortOptions.moreSupported,
      }),
    ));
    expect(doFetchCauses).toHaveBeenCalledWith({ page: 1, filters: '&order[followersCount]=desc' });
    expect(mockDispatch.mock.calls).toEqual([
      [{ payload: undefined, type: 'Cause/resetCauses' }],
      [
        {
          payload: { causes: CAUSES_MOCK, numberOfCauses: 12 },
          type: 'Cause/updateCauses',
        },
      ],
      [
        {
          payload: [CAUSES_MOCK[1].uuid],
          type: 'Cause/markCausesAsSupported',
        },
      ],
    ]);
    expect(result.current.hasMore).toBeFalsy();
  });

  it('should indicate if there is more items to load', async () => {
    const { result } = renderHook(() => useFetchCauses());
    void (await act(() =>
      result.current.fetchFirstPage({
        coalitionIds: [],
        searchText: '',
        sort: SortOptions.moreSupported,
      }),
    ));
    void (await act(() =>
      result.current.fetchNextPage({
        coalitionIds: [],
        searchText: '',
        sort: SortOptions.moreSupported,
      }),
    ));
    expect(doFetchCauses).toHaveBeenCalledTimes(1);
    expect(result.current.hasMore).toBe(false);
  });
});
