import * as useTypedAsyncFn from 'redux/useTypedAsyncFn';
import { act, renderHook } from '@testing-library/react-hooks';
import { CAUSES_MOCK } from '../fixtures';
import { useFetchCauses } from '../hooks';
import * as hooks from '../followHooks';

const doFetchCauses = jest
  .fn()
  .mockReturnValue({ items: CAUSES_MOCK, metadata: { total_items: 12, last_page: 1 } });

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
}));

describe('useFetchCauses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function to load first page', async () => {
    const { result } = renderHook(() => useFetchCauses());
    void (await act(() => result.current.fetchFirstPage([])));
    expect(doFetchCauses).toHaveBeenCalledWith({ page: 1, coalitionsFilter: '' });
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
    void (await act(() => result.current.fetchFirstPage([])));
    void (await act(() => result.current.fetchNextPage([])));
    expect(doFetchCauses).toHaveBeenCalledTimes(1);
    expect(result.current.hasMore).toBe(false);
  });
});
