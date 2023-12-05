import { createAction } from '../actionConfigs';

const PREFIX_ACTIONS = 'UI_';
const setLoading = createAction<{ path: string, result: boolean }>(PREFIX_ACTIONS + 'SET_LOADING');
const setLoadingPage = createAction<boolean>(PREFIX_ACTIONS + 'SET_LOADING_PAGE');

const setCollapseSidebar = createAction<boolean>(PREFIX_ACTIONS + 'SET_COLLAPSE_SIDEBAR');
const setShowModal = createAction<boolean>(PREFIX_ACTIONS + 'SET_SHOW_MODAL');

const uiActions = {
  setLoading,
  setLoadingPage,
  setCollapseSidebar,
  setShowModal
};
export default uiActions;
