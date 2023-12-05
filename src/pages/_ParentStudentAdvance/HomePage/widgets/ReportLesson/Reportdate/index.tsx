import moment from 'moment';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import lesionSelectors from '../../../../../ReportLesionPage/services/selectors';
import { Button, Empty, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { COLOR_PRIMARY } from '../../../../../../utils/variables/colors';

const ReportDate = () => {

  const formateDate = 'DD/MM/YYYY';
  const dataReportLesion = lesionSelectors.getLesionList();
  const [date, setDate] = useState<string>(moment().format(formateDate));

  const dataReport = useMemo(() => (dataReportLesion ?? [])?.map(o => ({
    title: o.Title__c,
    date: moment(o.SentDay__c).format(formateDate),
    content: o.Content__c
  })),[dataReportLesion]);

  const report = useMemo(() => {
    return dataReport.find(o => o.date === date);
  }, [date, dataReport]);

  return (
    <ReportDateStyled>
      <div className='filter'>

        <div className='month'>
          <Tooltip title="Ngày trước">
            <Button icon={<LeftOutlined />} size='large' type='text' shape='circle' onClick={() => {
                setDate( moment(date, formateDate).subtract(1, 'day').format(formateDate));
              }}></Button>
          </Tooltip>
          {date}
          <Tooltip title="Ngày sau">
            <Button icon={<RightOutlined />} size='large' type='text' shape='circle' onClick={() => setDate(moment(date, formateDate).add(1, 'day').format(formateDate))}></Button>
          </Tooltip>
        </div>
      </div>

      {report ? <div className='contain'>
        <div className='header'>
          <div dangerouslySetInnerHTML={{__html: report?.title}}></div>
        </div>
        <div className='content'>
        <div dangerouslySetInnerHTML={{__html: report?.content}}></div>

        </div>
      </div> : <Empty description='Không có báo bài'/>}



    </ReportDateStyled>
  );
};

export default ReportDate;

const ReportDateStyled = styled.div`
  padding: 0px 2px;
    .filter {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    .current {
      font-size: 18px;
    }

    .month{
      display: flex;
      gap: 8px;
      align-items: center;
      font-weight: 700;
      color: ${COLOR_PRIMARY};

      text-transform: uppercase;
      cursor: pointer;
    }

  }

  .contain {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid black;
    }
  }
`;