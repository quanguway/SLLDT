import { all } from 'redux-saga/effects';
import authServiceSaga from '../../pages/AuthPage/service/sagas';
import scoreboardServiceSaga from '../../pages/ScoreboardPage/service/sagas';
import studentServiceSaga from '../../pages/StudentPage/services/sagas';
import lesionServiceSaga from '../../pages/ReportLesionPage/services/sagas';
import absenceServiceSaga from '../../pages/AbsencePage/service/sagas';
import attendanceServiceSaga from '../../pages/Attendance/service/sagas';

export default function* rootSaga() {
  yield all([
    // define module saga here
    authServiceSaga(),
    scoreboardServiceSaga(),
    studentServiceSaga(),
    lesionServiceSaga(),
    absenceServiceSaga(),
    attendanceServiceSaga()
  ]);
}
