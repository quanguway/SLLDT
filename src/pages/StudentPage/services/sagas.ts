import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { default as apis, default as apisStudent } from './apis';
import { PATH_LOADING } from './constants';
import { setLoading } from '../../../services/UI/sagas';
import { ISagaFunc } from '../../../services/actionConfigs';
import uiActions from '../../../services/UI/actions';

// const data = [
//   {
//     MaHocSinh__c: '123',
//     Name: 'Nhật Nam',
//     birth__c: '2021/12/23',
//     gender__c: true,
//   },
//   {
//     MaHocSinh__c: '123',
//     Name: 'Nhật Nam',
//     birth__c: '2021/12/23',
//     gender__c: true,
//   },
//   {
//     MaHocSinh__c: '123',
//     Name: 'Nhật Nam',
//     birth__c: '2021/12/23',
//     gender__c: true,
//   },
//   {
//     MaHocSinh__c: '123',
//     Name: 'Nhật Nam',
//     birth__c: '2021/12/23',
//     gender__c: true,
//   }
// ];

const getListStudents = function* () {
  yield put(uiActions.setLoadingPage(true));

  try {
    yield setLoading(PATH_LOADING.getListStudents, true);
    
    const res: AxiosResponse<{ data: any[] }> = yield call(apis.getListStudent);
    if (res?.data?.data) {
      const studentList = res?.data?.data[0].Student;
      yield put(actions.getListStudent.success(studentList));
    } else {
      throw 'fail';
    }
  } catch (error) {
    yield put(actions.getListStudent.fail({}));
  } finally {
  yield put(uiActions.setLoadingPage(false));

  }
};

const getDetailStudent: ISagaFunc<string> = function* ({ payload }) {
  yield put(uiActions.setLoadingPage(true));

  const param = payload;
  try {
    const res: AxiosResponse<any> = yield call(apisStudent.getDetailStudent, param);
    if (res?.data?.data) {
      const StudentDetail = res.data.data[0];
      yield put(actions.getDetailStudent.success(StudentDetail));
    } else {
      throw 'fail';
    }
  } catch (error) {
    yield put(actions.getDetailStudent.fail({}));
  } finally {
  yield put(uiActions.setLoadingPage(false));

  }
};

export default function* studentServiceSaga() {

  yield takeLatest(actions.getListStudent.fetch, getListStudents);
  yield takeLatest(actions.getDetailStudent.fetch, getDetailStudent);
  // yield takeLatest(actions.setStudentListParams, setStudentListParams);
}
