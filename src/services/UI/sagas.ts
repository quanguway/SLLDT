import { put } from 'redux-saga/effects';
import actions from './actions';

export const setLoading = function* (path: string, result: boolean) {
  yield put(actions.setLoading({ path, result }));
};