import { Grid } from 'antd';
import { useMemo } from 'react';

export enum EScreen {
  BROWSER = 'browser',
  TABLET = 'tablet',
  MOBILE = 'mobile'
}

const { useBreakpoint } = Grid;
const useDetachScreen = () => {
  const screens = useBreakpoint();
  const { md, lg, xl, xxl } = screens;
  const screen = useMemo(() => {
    if (lg || xl || xxl) return EScreen.BROWSER;
    else if (md) return EScreen.TABLET;
    else return EScreen.MOBILE;
  }, [screens]);

  return screen;
};

export default useDetachScreen;
