import { styled } from 'styled-components';
import Filter from '../../component/template/Filter';
import { Card } from 'antd';
import DataTable from '../../component/molecule/DataTable';

const ReportCardPage = () => {

  const columns = [
    {
      title: 'Môn',
      dataIndex: 'subject',
      key: 'subject',
      with: 300
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Mức đạt được',
      dataIndex: 'range',
      key: 'range',
      
    },
  ];

  const dataSource = [
    {
      subject: 'Tiếng việt',
      score: 10,
      range: 'T'
    },
    {
      subject: 'Toán',
      score: 10,
      range: 'T'
    },
    {
      subject: 'Ngoại ngữ',
      score: 10,
      range: 'T'
    },
    {
      subject: 'Tin học',
      score: 10,
      range: 'T'
    },
    {
      subject: 'Khoa học',
      score: 10,
      range: 'T'
    },
    {
      subject: 'Sử địa',
      score: 10,
      range: 'T'
    },
  ];

  return (
    <ReportCardPageStyled>
      <Filter>

      </Filter>
      <div className='report-card-content'>
          <Card title='Các môn học vào hoạt động tiểu học'>
            <DataTable columns={columns} dataSource={dataSource}/>
          </Card>
          <Card title='Các năng lực phẩm chất'>
            <DataTable columns={columns} dataSource={dataSource}/>
          </Card>

      </div>
    </ReportCardPageStyled>
  );
};

export default ReportCardPage;

const ReportCardPageStyled = styled.div`
  .report-card-content {
    display: flex;
    width: 100%;
    gap: 24px;
  }
`;