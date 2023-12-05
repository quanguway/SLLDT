import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';



type MyState = RootState['student'];

const getCurrentState = (state: RootState): MyState => state.student;

const selector = <KEY = keyof MyState>(key: KEY, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key as any, defaultValue));

const getStudentList = () => selector('studentList');

const getStudentDetail = () => selector('studentDetail');





// const getParams = () => selector('params') as IStudentParam;

const StudentSelectors = {
  getStudentList,
  getStudentDetail,
};

export default StudentSelectors;