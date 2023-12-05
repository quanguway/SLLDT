import absenceServiceReducer from '../../pages/AbsencePage/service/reducers';
import attendanceServiceReducer from '../../pages/Attendance/service/reducers';
import authServiceReducer from '../../pages/AuthPage/service/reducers';
import lesionServiceReducer from '../../pages/ReportLesionPage/services/reducers';
import scoreboardServiceReducer from '../../pages/ScoreboardPage/service/reducers';
import studentServiceReducer from '../../pages/StudentPage/services/reducers';
import uiServiceReducer from '../../services/UI/reducer';

const rootReducer = {
  ui: uiServiceReducer,
  auth: authServiceReducer,
  scoreboard: scoreboardServiceReducer,
  student: studentServiceReducer,
  lesion: lesionServiceReducer,
  absence: absenceServiceReducer,
  attendance: attendanceServiceReducer
};

export default rootReducer;
