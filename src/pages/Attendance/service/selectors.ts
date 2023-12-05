import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
// import { calculateAverage } from '../../../utils/unit';
import { DataAttendance } from './types/attendance';



type MyState = RootState['attendance'];

const getCurrentState = (state: RootState): MyState => state.attendance;

const selector = <T = MyState>(key: keyof T, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));

const getAttendanceDetail = () => selector('attendanceDetail') as DataAttendance[];

const attendanceSelectors = {
  getAttendanceDetail
};
export default attendanceSelectors;
