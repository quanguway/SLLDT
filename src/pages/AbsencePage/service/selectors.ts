import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
import { TAbsenceRes } from './types/absence';



type MyState = RootState['absence'];

const getCurrentState = (state: RootState): MyState => state.absence;

const selector = <T = MyState>(key: keyof T, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));

const getAbsenceParent = () => selector('absenceParent') as TAbsenceRes[];

const absenceSelectors = {
  getAbsenceParent
};
export default absenceSelectors;
