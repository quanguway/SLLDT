import { createAction } from '@reduxjs/toolkit';
import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';
import { ParentReportDetail } from './types/reportLession';

const getListLesion = createAsyncAction<boolean | undefined>(PREFIX_ACTIONS + 'GET_LIST_LESION');
const getDetailLesion = createAsyncAction<string>(PREFIX_ACTIONS + 'GET_DETAIL_LESION');

const setDetailParentReportLesion = createAction<ParentReportDetail[]>(PREFIX_ACTIONS + 'SET_DETAIL_PARENT_REPORT_LESION');
// const setCustomerListParams = createAction<ICustomerParam>(PREFIX_ACTIONS + 'SET_Lesion_LIST_PARAMS');

const lesionActions = {
  getListLesion,
  getDetailLesion,
  setDetailParentReportLesion
  // setCustomerListParams,
};

export default lesionActions;
