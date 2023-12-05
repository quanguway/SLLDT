import uiSelector from '../UI/selectors';
import uiActions from '../UI/actions';
import { generateHookStore } from './generateHook/generateHookStore';


export const useCollapseSidebar = (initialValue: boolean = false): [ boolean, (e: boolean) => void ] => {
  return generateHookStore<boolean>(uiSelector.getCollapseSidebar() ?? initialValue, uiActions.setCollapseSidebar);
};