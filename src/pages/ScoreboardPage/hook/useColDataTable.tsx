import { useAppDispatch } from '../../../store/hooks';
import scoreboardActions from '../service/actions';


export const useColDataTable = (row: string, col : [any, number?]) : [string, (value: string) => void] => {
  const dispatch = useAppDispatch();
  // const rowData = scoreboardSelectors.getScoreboard().find(o => o.studentCode === row);
  // const valueTable = rowData?.[name] as string ?? '';  
  // const value = index !== undefined ? (rowData?.[name] as any[])?.[index]?.toString() ?? ''  : valueTable ?? '';  

  const setValue = (value: string) => {
    dispatch(scoreboardActions.setColScoreboard({row, col, value}));
  };

  // return [value, setValue];
  return ['', setValue];
};