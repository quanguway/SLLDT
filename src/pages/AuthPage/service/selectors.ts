import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';



type MyState = RootState['auth'];

const getCurrentState = (state: RootState): MyState => state.auth;

const selector = <T = MyState>(key: keyof T, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));

const getToken = () => selector('access_token') as string;

const authSelectors = {
  getToken
};
export default authSelectors;
