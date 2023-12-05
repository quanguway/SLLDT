import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import apis from './apis';
// import { setLoading } from '../../../services/UI/sagas';
import uiActions from '../../../services/UI/actions';
import { AxiosResponse } from 'axios';

const getAbsenceParent= function* () {
  yield put(uiActions.setLoadingPage(true));
  
  try {
    
    const res: AxiosResponse<{ data: any[] }> = yield call(apis.getAbsenceParent);    
    const resData = res?.data?.data;
    if (!resData) throw 'fail';        

    yield put(actions.getAbsenceParent.success(resData));


  } catch (error) {
    yield put(actions.getAbsenceParent.fail({}));
  } finally {
    yield put(uiActions.setLoadingPage(false));
  }
};



export default function* absenceServiceSaga() {
  yield takeLatest(actions.getAbsenceParent.fetch, getAbsenceParent);
}
