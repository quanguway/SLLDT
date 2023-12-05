import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { default as apis } from './apis';
import uiActions from '../../../services/UI/actions';
import { ISagaFunc } from '../../../services/actionConfigs';

const getListLesion: ISagaFunc<boolean> = function* ({payload}) {
  yield put(uiActions.setLoadingPage(true));
  
  try {
    const res: AxiosResponse<{ data: any[] }> = yield call(apis.getListLesion, payload ?? false);
    if (res?.data?.data) {      
      const studentList = res?.data?.data;
      yield put(actions.getListLesion.success(studentList));
    } else {
      throw 'fail';
    }
  } catch (error) {
    // message.error('Đã có lỗi xảy ra');
    yield put(actions.getListLesion.fail({}));
  } finally {
  yield put(uiActions.setLoadingPage(false));

  }
};

// const getDetailStudent: ISagaFunc<string> = function* ({ payload }) {
//   yield put(uiActions.setLoadingPage(true));

//   const param = payload;
//   try {
//     const res: AxiosResponse<any> = yield call(apisStudent.getDetailStudent, param);
//     if (res?.data?.data) {
//       const StudentDetail = res.data.data[0];
//       console.log(StudentDetail);
      
//       yield put(actions.getDetailStudent.success(StudentDetail));
//     } else {
//       throw 'fail';
//     }
//   } catch (error) {
//     yield put(actions.getDetailStudent.fail({}));
//   } finally {
//   yield put(uiActions.setLoadingPage(false));

//   }
// };

export default function* lesionServiceSaga() {

  // yield takeLatest(actions.getListStudent.fetch, getListStudents);
  yield takeLatest(actions.getListLesion.fetch, getListLesion);
  // yield takeLatest(actions.setStudentListParams, setStudentListParams);
}
