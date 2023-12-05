import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';

const getListStudent = createAsyncAction(PREFIX_ACTIONS + 'GET_LIST_STUDENT');
const getDetailStudent = createAsyncAction<string>(PREFIX_ACTIONS + 'GET_DETAIL_STUDENT');
// const setCustomerListParams = createAction<ICustomerParam>(PREFIX_ACTIONS + 'SET_STUDENT_LIST_PARAMS');

const studentActions = {
  getListStudent,
  getDetailStudent
  // setCustomerListParams,
};

export default studentActions;
