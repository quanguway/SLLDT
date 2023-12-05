import { PREFIX_ACTIONS } from './constants';
import { IApiLoginBody } from './types/auth';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';

const login = createAsyncAction<IApiLoginBody>(PREFIX_ACTIONS + 'LOGIN');

const setToken = createAction<string>(PREFIX_ACTIONS + 'SET_TOKEN');

const refreshToken = createAction<{ pathname: string }>(PREFIX_ACTIONS + 'REFRESH_TOKEN');


const authActions = {
  login,
  setToken,
  refreshToken
};

export default authActions;
