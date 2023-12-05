import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Empty, Tabs, Tooltip } from 'antd';
import moment from 'moment';
import { styled } from 'styled-components';
import lesionSelectors from '../../../../../ReportLesionPage/services/selectors';
import { useMemo, useState } from 'react';
import { getDatesBetween, getDayOfWeek } from '../../../../../../utils/unit';
import dayjs from 'dayjs';
import { COLOR_PRIMARY } from '../../../../../../utils/variables/colors';

const ReportWeek = () => {


  const formateDate = 'DD/MM/YYYY';
  const dataReportLesion = lesionSelectors.getLesionList();
  const [date, setDate] = useState<string>(moment().format(formateDate));
  // const [week, setWeek] = useState<{start: string, end: string}>();

  const dataReport = useMemo(() => (dataReportLesion ?? [])?.map(o => ({
    title: o.Title__c,
    date: moment(o.SentDay__c).format(formateDate),
    content: o.Content__c
  })),[dataReportLesion]);

  // const report = useMemo(() => {
  //   return dataReport.find(o => o.date === date);
  // }, [date]);


  const weeks = useMemo (() => {

    
    const startDate = moment(date, formateDate).startOf('week').add(1, 'day').format(); 
    const endDate = moment(date, formateDate).endOf('week').format(); 

    const weekDate = getDatesBetween(dayjs(startDate), dayjs(endDate));

    return weekDate;
  }, [date]);

  return (
    <ReportWeekStyled>
      <div className='filter'>

      <div className='month'>
        <Tooltip title="Tuần trước">
          <Button icon={<LeftOutlined />} size='large' type='text' shape='circle' onClick={() => {
              setDate( moment(date, formateDate).subtract(1, 'week').format(formateDate));
            }}></Button>
        </Tooltip>
        {moment(date, formateDate).startOf('week').format('DD.MM') + ' - ' + moment(date, formateDate).endOf('week').format('DD.MM.YYYY')}
        <Tooltip title="Tuần sau">
          <Button icon={<RightOutlined />} size='large' type='text' shape='circle' onClick={() => setDate(moment(date, formateDate).add(1, 'week').format(formateDate))}></Button>
        </Tooltip>
        </div>
      </div>

      <Tabs
        defaultActiveKey={moment().format(formateDate)}
        tabPosition={'left'}
        items={weeks.map((value, i) => {
          const id = String(i);
          return {
            label: `${getDayOfWeek(moment(value.format()))} ${value.format('DD.MM')}`,
            key: id,
            children: dataReport.some(o => o.date === value.format(formateDate)) ? (
              <>
                <div className='contain'>
                  <div className='header'>
                    {dataReport.find(o => o.date === value.format(formateDate))?.title}
                  </div>
                  <div className='content'>
                    <div dangerouslySetInnerHTML={{__html: dataReport.find(o => o.date === value.format(formateDate))?.content ?? ''}}></div>
                  </div>
                </div>
              </> 
            ) : <Empty description='Không có báo bài'/>,
          };
        })}
      />

     
    </ReportWeekStyled>
  );
};

export default ReportWeek;

const ReportWeekStyled =styled.div`
    .filter {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
      .current {
        font-size: 18px;
      }

      border-bottom: 1px solid black;
      padding-bottom: 12px;

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