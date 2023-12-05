import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
import { ParentReportDetail, ReportLesion } from './types/reportLession';



type MyState = RootState['lesion'];

const getCurrentState = (state: RootState): MyState => state.lesion;

const selector = <KEY = keyof MyState>(key: KEY, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key as any, defaultValue));

const getLesionList = () => selector('lesionList') as ReportLesion[];

const getLessonParentDetail = () => selector('lessonParentDetail') as ParentReportDetail[];






// const getStudentDetail = () => selector('studentDetail');





// const getParams = () => selector('params') as IStudentParam;

const lesionSelectors = {
  getLesionList,
  // getlesionDetail,
  getLessonParentDetail,
};

export default lesionSelectors;