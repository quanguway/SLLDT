import { styled } from 'styled-components';
import { Card, Tabs, TabsProps } from 'antd';
import LeaveOfAbsence from './widgets/LeaveOfAbsence';
import ListAbsence from './widgets/ListAbsence';
import { useAppDispatch } from '../../store/hooks';
import { useEffect, useMemo } from 'react';
import absenceAction from './service/actions';
import absenceSelectors from './service/selectors';

  
export enum EAbsenceStatus {
  ACCEPT = 'ACCEPT',
  PENDING = 'PENDING',
  DRAFT = 'DRAFT',
  DELETE = 'DELETE'
}

const AbsencePage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(absenceAction.getAbsenceParent.fetch());
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Xin nghĩ phép',
      children: <LeaveOfAbsence />,
    },
    {
      key: '2',
      label: 'Phép chờ xác nhận',
      children: <ListAbsence />,
    },
    {
      key: '3',
      label: 'Phép đã xác nhận',
      children: <ListAbsence isAccept/>,
    },
  ];

  const absenceParents = absenceSelectors.getAbsenceParent();

  const info = useMemo(() => {

    const absenceParentXacNhan =  absenceParents.filter(o => o.TrangThai__c === EAbsenceStatus.ACCEPT);
    const absenceParentChauXacNhan =  absenceParents.filter(o => o.TrangThai__c !== EAbsenceStatus.ACCEPT);

    return [
    {
      label: 'Tổng số đơn nghỉ',
      value: absenceParentChauXacNhan.length + absenceParentXacNhan.length
    },
    {
      label: 'Tổng số đơn đã xác nhận',
      value: absenceParentXacNhan.length
    },
    {
      label: 'Tổng số đơn chưa xác nhận',
      value: absenceParentChauXacNhan.length
    }
  ];
}, [absenceParents]) ;

  return (
    <AbsencePageStyled>
      <h3 style={{
        margin: '24px 0px',
        textAlign: 'center',
        fontSize: '24px'
      }}>Nghỉ phép</h3>
      <div className='info' style={{margin: '26px 0px'}}>
        {info.map((o, index) => (
            <Card key={index} className='col-info' bordered={false}>
              <p style={{fontSize:'26px', fontWeight: 700}}>{o.value}</p>
              <p>{o.label}</p>
            </Card>
        ))}
      </div>
      <Tabs defaultActiveKey='1' items={items} />
    </AbsencePageStyled>
  );
};

export default AbsencePage;

const AbsencePageStyled = styled.div`
  padding: 0px 100px;

  .ant-tabs {
    box-shadow: 3px 3px 20px lightgray;
    padding: 16px 24px;
    border-radius: 12px;
  }

  .ant-col {
    padding: 0px !important;
  }



  .info {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 12px;

    .col-info {
      box-shadow: 3px 3px 20px lightgray;
      width: 100%;

  }
  }
`;