import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import apis, { TScoreboardParamReq } from './apis';
import { ISagaFunc } from '../../../services/actionConfigs';
// import { setLoading } from '../../../services/UI/sagas';
import uiActions from '../../../services/UI/actions';


const getScoreboard: ISagaFunc<TScoreboardParamReq> = function* ({ payload }) {
  yield put(uiActions.setLoadingPage(true));
  const param = payload;
  
  try {
    const res = yield call(apis.getScoreboard, param);    
    if(res?.data?.data) {
      yield put(actions.getScoreboard.success(res.data.data));
    }
  } catch (error) {
    yield put(actions.getScoreboard.fail({}));
  } finally {
    yield put(uiActions.setLoadingPage(false));
  }
};

const getScoreboardDetail: ISagaFunc<TScoreboardParamReq> = function* ({ payload }) {
  yield put(uiActions.setLoadingPage(true));
  const param = payload;
  
  try {
    const res = yield call(apis.getScoreboardDetail, param);    
    if(res?.data?.data?.data) {
      yield put(actions.getScoreboardDetail.success(res.data.data.data));
    }
  } catch (error) {
    yield put(actions.getScoreboardDetail.fail({}));
  } finally {
    yield put(uiActions.setLoadingPage(false));
  }
};


export default function* scoreboardServiceSaga() {
  yield takeLatest(actions.getScoreboard.fetch, getScoreboard);
  yield takeLatest(actions.getScoreboardDetail.fetch, getScoreboardDetail);
  // yield takeLatest(actions.login.fetch, login);
}
