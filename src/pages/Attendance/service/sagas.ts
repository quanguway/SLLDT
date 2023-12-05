import {put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { TScoreboardParamReq } from './apis';
import { ISagaFunc } from '../../../services/actionConfigs';
// import { setLoading } from '../../../services/UI/sagas';
import uiActions from '../../../services/UI/actions';
import { DataAttendance } from './types/attendance';

const getAttendanceDetail: ISagaFunc<TScoreboardParamReq> = function* ({ }) {
  yield put(uiActions.setLoadingPage(true));
  
  try {
    // const res = yield call(apis.getScoreboard, param);  
    const res: DataAttendance[] = [
      {
        MaHocSinh__c: '123',
        Name: 'haha',
        VangMat__c: false,
        CoPhep__c: true
      }
    ];
    if(res) {
      yield put(actions.getAttendanceDetail.success(res));
    }
  } catch (error) {
    yield put(actions.getAttendanceDetail.fail({}));
  } finally {
    yield put(uiActions.setLoadingPage(false));
  }
};



export default function* attendanceServiceSaga() {
  yield takeLatest(actions.getAttendanceDetail.fetch, getAttendanceDetail);
}
