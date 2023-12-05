import { render } from '@testing-library/react';
import CalendarDays from '../../../pages/_ParentStudentAdvance/component/Calendar';
import { useAppDispatch } from '../../../store/hooks';
import LoginPage from '../../../pages/AuthPage/LoginPage';
require('@testing-library/jest-dom');

jest.mock('../../../store/hooks');

// @ts-ignore
describe('List.js component', () => {

  beforeEach(() => {
    useAppDispatch.mockReturnValue(jest.fn);
  }); 

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render calendar', () => {
    render(<LoginPage/>);
  });

});