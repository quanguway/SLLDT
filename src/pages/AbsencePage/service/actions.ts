import { PREFIX_ACTIONS } from './constants';
import { createAsyncAction } from '../../../services/actionConfigs';

const getAbsenceParent = createAsyncAction(PREFIX_ACTIONS + 'getAbsenceParent');


const absenceAction = {
  getAbsenceParent
};

export default absenceAction;
