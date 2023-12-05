import { ReadOutlined, FundProjectionScreenOutlined, ContactsOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { styled } from 'styled-components';
import StudentIcon from '../../../asset/svg/StudentIcon';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/paths';
import storage from '../../../utils/sessionStorage';


interface IMenuItem {
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: IMenuItem[],
  link?: string;
}

const MenuSidebar = ({collapsed} : {collapsed: boolean}) => {
  const navigate = useNavigate();
  const PATH_PRIVATE = PATH;

  const getItem = (label: IMenuItem['label'], key: IMenuItem['key'], icon?: IMenuItem['icon'], link?: IMenuItem['link'], children?: IMenuItem[]) => {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        (link && link !== '') && navigate(link);
      }
    } as IMenuItem;
  };
  
  const getSubItem = (label: IMenuItem['label'], key: IMenuItem['key'], link?: IMenuItem['link']) => {
    return {
      label,
      key,
      onClick: () => {
        link && navigate(link);
      }
    };
  };

  const items: IMenuItem[] = storage.get('role') === 'ADMIN' ? [
    getItem('Lớp học', 'class', <ContactsOutlined />,'/class'),
    getItem('Học sinh', 'student',<StudentIcon/>, '/students'),
    getItem('Phụ huynh', 'parent',<ReadOutlined />, '/parent'),
    getItem('Giáo viên', 'teacher',<FundProjectionScreenOutlined />, '/teacher'),
  ] : [
    getItem('Điểm danh', 'diem_danh', <ContactsOutlined />,'/attendance'),
    getItem('Báo bài', 'báo_bai',<ReadOutlined />, '/report-lesion'),
    getItem('Thời khoá biểu', 'tkb', <ScheduleOutlined />, '/time-table'),
    // getItem('Báo cáo', '2', <FundProjectionScreenOutlined />),
    getItem('Quản lý học sinh','student' ,<StudentIcon/>, '' ,[
      getSubItem('Nhập điểm', 'nhap_diem', PATH_PRIVATE._STUDENT._SCOREBOARD),
      getSubItem('Danh sách', 'danh_sach', PATH_PRIVATE._STUDENT._INDEX),
    ]),
    getItem('Thống kê', '2', <FundProjectionScreenOutlined />, '/analytic'),

  ];
  
  return (
    <MenuStyled
      mode="inline"
      style={{ borderRight: 0 }}
      inlineCollapsed={collapsed}
      theme='dark'
      items={items}
    />
  );
};

export default MenuSidebar;

const MenuStyled = styled(Menu)`
  
`;




