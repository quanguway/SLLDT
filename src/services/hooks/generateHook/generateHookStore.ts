import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../store/hooks';

export const generateHookStore = <T> (selector: T, actions: ActionCreatorWithPayload<T, string>) : [ T, (e: T) => void ] => {
  const dispatch = useAppDispatch();
  const value = selector;
  const setValue = (e: T) => {
    dispatch(actions(e));
  };
  
  return [value, setValue];
  
};