import uiActions from '../../../../services/UI/actions';
import uiSelector from '../../../../services/UI/selectors';
import { generateHookStore } from '../../../../services/hooks/generateHook/generateHookStore';

export const useShowModal = (initialValue: boolean): [ boolean, (e: boolean) => void ] => {
  return generateHookStore<boolean>(uiSelector.getShowModal() ?? initialValue, uiActions.setShowModal);
};