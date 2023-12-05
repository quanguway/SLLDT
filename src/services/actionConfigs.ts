import { createAction as toolkitCreateAction } from '@reduxjs/toolkit';

export interface ICompileActionSaga<T> {
  payload: T;
  type: string;
}
export type ISagaFunc<T = any> = ({ payload }: ICompileActionSaga<T>) => Generator<any, any, any>;

export const createAsyncAction = <T = undefined, ISuccess = any, IFail = any>(
  type: string,
) => {
  return {
    fetch: toolkitCreateAction<T>(type),
    fetchPaging: toolkitCreateAction<T>(type + '_PAGING'),
    success: toolkitCreateAction<ISuccess>(type + '_SUCCESS'),
    fail: toolkitCreateAction<IFail>(type + '_FAIL'),
  };
};
export const createAction = toolkitCreateAction;
