import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import store from './store';
import LoadingPage from './services/UI/LoadingPage';
import CustomerPage from './pages/CustomerPage';
import LoginPage from './pages/AuthPage/LoginPage';
import AuthLayout from './layout/AuthLayout';
import { PATH } from './utils/paths';
import ScoreboardPage from './pages/ScoreboardPage';
import TimeTablePage from './pages/TimeTablePage';
import ProfilePage from './pages/ProfilePage';
import ReportCardPage from './pages/ReportCardPage';
import AbsencePage from './pages/AbsencePage';
import StudentPage from './pages/StudentPage';
import ReportLesionPage from './pages/ReportLesionPage';
import AttendanceCheckPage from './pages/AttendanceCheckPage';
import EvaluationSheetPage from './pages/EvaluationSheetPage';
import AttendancePage from './pages/Attendance';
import AttendanceTodayPage from './pages/AttendanceToday';
import ParentStudentLayout from './pages/_ParentStudentAdvance/ParentStudentLayout';
import ParentStudentReportLessonPage from './pages/_ParentStudentAdvance/ReportLession';
import { ConfigProvider } from 'antd';

// import 'dayjs/locale/vi';
// import updateLocale from 'dayjs/plugin/updateLocale';
// import dayjs from 'dayjs';
import locale from 'antd/es/locale/vi_VN';
import ParentStudentHomePage from './pages/_ParentStudentAdvance/HomePage';
import ParentStudentTimeTablePage from './pages/_ParentStudentAdvance/TimeTable';
import ClassPage from './pages/_Admin/Class';
import TeacherPage from './pages/_Admin/Teacher';
import StudentAdminPage from './pages/_Admin/Student';
import ParentAdminPage from './pages/_Admin/Parent';
import AnalyticPage from './pages/_TeacherNew/Analytic';

// dayjs.extend(updateLocale);

function AppUI() {
  // const { shield} = useToken();



  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth' element={<AuthLayout/>}>
          <Route path='sign-in' element={<LoginPage/>}/>
        </Route>

        <Route path='/' element={<AppLayout/>}>
          <Route index path='/' element={<DashboardPage />} />
          <Route path={PATH._ATTENDANCE_PAGE} element={<AttendanceCheckPage />}/>
          <Route path='customers' element={<CustomerPage />} />
          <Route path='time-table' element={<TimeTablePage />} />
          <Route path={PATH._STUDENT._SCOREBOARD} element={<ScoreboardPage />} />
          <Route path={PATH._STUDENT._INDEX} element={<StudentPage />} />
          <Route path={`${PATH._STUDENT._INDEX}/:id`} element={<ProfilePage/>} />
          <Route path={PATH._REPORT_CARD} element={<ReportCardPage/>} />
          {/* <Route path={PATH._LEAVE_OF_ABSENCE} element={<AbsencePage/>} /> */}
          <Route path={PATH._REPORT_LESION} element={<ReportLesionPage />} />
          <Route path='/attendance/create-today' element={<AttendanceTodayPage />}/>
          <Route path='/analytic' element={<AnalyticPage />}/>



          <Route path='/time-table' element={<TimeTablePage />}/>
          <Route path='/class' element={<ClassPage />}/>
          <Route path='/teacher' element={<TeacherPage />}/>
          <Route path='/students' element={<StudentAdminPage />}/>
          <Route path='/parent' element={<ParentAdminPage />}/>

        </Route>

        <Route path='app' element={<ParentStudentLayout />}>
          {/* <Route index path='home' element={<ParentHomePage />}/> */}
          <Route index path='home' element={<ParentStudentHomePage />}/>
          <Route index path='evaluation-sheet' element={<EvaluationSheetPage />}/>
          {/* <Route path='report-session' element={<ParentReportSessionNewPage />}/> */}
          <Route path='report-session' element={<ParentStudentReportLessonPage />}/>
          <Route path='parent-attendance' element={<AttendancePage />}/>
          <Route path='time-table' element={<ParentStudentTimeTablePage />}/>
          <Route path='leave-of-absence' element={<AbsencePage/>} />

        </Route>

        <Route path='parent-student' element={<ParentStudentLayout />}>
          <Route index path='report-lesson' element={<ParentStudentReportLessonPage />}/>
          <Route index path='' element={<ParentStudentHomePage />}/>
          {/* <Route index path='evaluation-sheet' element={<EvaluationSheetPage />}/>
          <Route path='report-session' element={<ParentReportSessionNewPage />}/>
          <Route path='parent-attendance' element={<AttendancePage />}/>
          <Route path='time-table' element={<TimeTablePage />}/> */}
        </Route>

        
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

function App() { 
  
  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <AppUI />
        <LoadingPage />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
