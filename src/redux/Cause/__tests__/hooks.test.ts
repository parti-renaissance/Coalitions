import * as useTypedAsyncFn from 'redux/useTypedAsyncFn';
import { act, renderHook } from '@testing-library/react-hooks';
import { CAUSES_MOCK } from '../fixtures';
import { useFetchCauses } from '../hooks';

const doFetchCauses = jest
  .fn()
  .mockReturnValue({ items: CAUSES_MOCK, metadata: { total_items: 12 } });
jest
  .spyOn(useTypedAsyncFn, 'useTypedAsyncFn')
  .mockImplementation(() => [{ loading: false, error: undefined }, doFetchCauses]);

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
    void (await act(() => result.current.fetchFirstPage()));
    expect(doFetchCauses).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { causes: CAUSES_MOCK, numberOfCauses: 12 },
      type: 'Cause/updateCauses',
    });
    expect(result.current.hasMore).toBeFalsy();
  });

  it('should indicate if there is more items to load', async () => {
    const { result } = renderHook(() => useFetchCauses());
    void (await act(() => result.current.fetchFirstPage()));
    void (await act(() => result.current.fetchNextPage()));
    expect(doFetchCauses).toHaveBeenCalledTimes(1);
    expect(result.current.hasMore).toBe(false);
  });

  it('should return a function to load next pages', async () => {
    const { result } = renderHook(() => useFetchCauses(2));
    void (await act(() => result.current.fetchFirstPage()));
    void (await act(() => result.current.fetchNextPage()));
    void (await act(() => result.current.fetchNextPage()));
    expect(doFetchCauses.mock.calls).toEqual([[1], [2], [3]]);
    expect(mockDispatch.mock.calls).toEqual([
      [{ payload: { causes: CAUSES_MOCK, numberOfCauses: 12 }, type: 'Cause/updateCauses' }],
      [{ payload: { causes: CAUSES_MOCK, numberOfCauses: 12 }, type: 'Cause/updateCauses' }],
      [{ payload: { causes: CAUSES_MOCK, numberOfCauses: 12 }, type: 'Cause/updateCauses' }],
    ]);
  });
});
