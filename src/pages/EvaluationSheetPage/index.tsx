import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { Card, Col, Form, Row, Select} from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import scoreboardActions from '../ScoreboardPage/service/actions';
// import { Evalution } from '../ScoreboardPage/service/apis';
import scoreboardSelectors from '../ScoreboardPage/service/selectors';
import { getTalentByScore } from '../../utils/unit';
type LayoutType = Parameters<typeof Form>[0]['layout'];
// interface DataType {
//   key: number;
//   subject:string;
//   score: string;
//   comment: number;
//   talent: string;
// }
const columns2: ColumnsType<any> = [
  {
    title: 'Năng lực',
    dataIndex: 'subject',
    fixed: true,
    rowScope: 'row',
    width: 200,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'talent',
    fixed: true,
    width: 80,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    dataIndex: 'comment',
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 4 };
      }
      // These two are merged into above cell
      if (index === 1) {
        return { rowSpan: 0 };
      }
      if (index === 2) {
        return { rowSpan: 0 };
      }
      if (index === 3) {
        return { rowSpan: 0 };
      }

      return {};
    },
  },
];
const columns3: ColumnsType<any> = [
  {
    title: 'Phẩm chất',
    dataIndex: 'subject',
    fixed: true,
    rowScope: 'row',
    width: 200,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'talent',
    fixed: true,
    width: 80,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    dataIndex: 'comment',
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 4 };
      }
      // These two are merged into above cell
      if (index === 1) {
        return { rowSpan: 0 };
      }
      if (index === 2) {
        return { rowSpan: 0 };
      }
      if (index === 3) {
        return { rowSpan: 0 };
      }
      if (index === 4) {
        return { rowSpan: 0 };
      }

      return {};
    },
  },
];
const columns: ColumnsType<any> = [
  {
    title: 'Môn học và hoạt động giáo dục',
    dataIndex: 'subject',
    rowScope: 'row',
    fixed: true,
    width: 120,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'talent',
    fixed: true,
    width: 100,
    
  },
  {
    title: 'Điển KTĐK',
    dataIndex: 'score',
    fixed: true,
    width: 100,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    rowSpan:4,
    dataIndex: 'comment',
    fixed: true,
    width: 300,
  },
];


const EvaluationSheetPage = () => {
  // const classId = storage.get('class_id');
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');
  // const[dataSelect1, setDataSelect1]= useState('');
  // const[dataSelect2, ]= useState('');
  const params = scoreboardSelectors.getParams();

  const scoreboardDetail = scoreboardSelectors.getScoreboardDetail()?.[0];  
  const data = scoreboardDetail?.scores?.filter(o => o.evaluationType === 'SCORE')?.map((o, index) => ({
    key: index + 1,
    subject: o.subjectName,
    score: o.score,
    comment: o.evaluationComment,
    talent: getTalentByScore(o.score)

  }));

  const data2 = scoreboardDetail?.scores?.filter(o => o.subjectId?.slice(0, -2) === 'NANG_LUC')?.map((o, index) => ({
    key: index + 1,
    subject: o.subjectName,
    score: o.score,
    comment: o.evaluationComment,
    talent: o.talent
  }));

  const data3 = scoreboardDetail?.scores?.filter(o => o.subjectId?.slice(0, -2) === 'PHAM_CHAT')?.map((o, index) => ({
    key: index + 1,
    subject: o.subjectName,
    score: o.score,
    comment: o.evaluationComment,
    talent: o.talent
  }));
  
  // const data2: DataType[] = [
  //   {
  //     key: '1',
  //     content:'Chăm học, chăm làm',
  //     name: '',
  //     age: 32,
  //     tel: '',
  //     phone: 0,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     content:'Tự tin, trách nhiệm',
  //     name: '',
  //     tel: '',
  //     phone: 0,
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     content:'Trung thủy, kỉ luật',
  //     name: '',
  //     age: 32,
  //     tel: '',
  //     phone: 0,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     content:'Đoàn kết yêu thương',
  //     name: '',
  //     age: 32,
  //     tel: '0',
  //     phone: 0,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
    
  // ];
  
  // const data3: DataType[] = [
  //   {
  //     key: '1',
  //     content:'Tự phục vụ, tự quản',
  //     name: '',
  //     age: 32,
  //     tel: '',
  //     phone: 0,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     content:'Hợp tác',
  //     name: '',
  //     tel: '0',
  //     phone: 0,
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     content:'Tự học, giải quyết vấn đề',
  //     name: '',
  //     age: 32,
  //     tel: '0',
  //     phone: 0,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
    
  // ];


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(scoreboardActions.getScoreboardDetail.fetch({
      typeEvalution: params.evaluation
    }));
  }, []);

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  // const buttonItemLayout =
  //   formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  //   const onChange = (value: string) => {
  //     setDataSelect1(value);
  //   };

    const onChange2 = (value: string) => {
      dispatch(scoreboardActions.getScoreboardDetail.fetch({
        typeEvalution: value as any
      }));
    };
    
    const onSearch = (value: string) => {
      console.log('search:', value);
    };
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    // hàm xử lý Lọc
    // const onFinish = (value: string) =>{ console.log(dataSelect1+' '+dataSelect2);};
    
  return (
    <EvaluationSheetPageStyled>
      <Row gutter={1} className='content'>
        <Col className='filter-card' >
          <Card bordered={false}>
              <Form
                  {...formItemLayout}
                  layout={formLayout}
                  form={form}
                  initialValues={{ layout: formLayout }}
                  onValuesChange={onFormLayoutChange}
                  style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                >
                {/* <Form.Item label="Lớp">
                <Select
                  showSearch
                  placeholder="Lớp"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                      {
                        value: '2023',
                        label: '2023-2024',
                      },
                      {
                        value: '2024',
                        label: '2024-2025',
                      },
                      {
                        value: '2025',
                        label: '2025-2026',
                      },
                    ]}
                  />
                  </Form.Item> */}
                  <Form.Item label="Học kì">
                  <Select
                    showSearch
                    placeholder="Bảng điểm"
                    optionFilterProp="children"
                    onChange={onChange2}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    defaultValue={'GIUA_HK_1'}
                    options={[
                      {
                        value: 'GIUA_HK_1',
                        label: 'Giữa kì 1',
                      },
                      {
                        value: 'CUOI_HK_1',
                        label: 'Cuối kì 1',
                      },
                      {
                        value: 'GIUA_HK_2',
                        label: 'Giữa kì 2',
                      },
                      {
                        value: 'CUOI_HK_2',
                        label: 'Cuối kì 2',
                      },
                    ] as {value: 'GIUA_HK_1' | 'CUOI_HK_1' | 'GIUA_HK_2' | 'CUOI_HK_2', label: string} []}
                  />
                </Form.Item>
              </Form>
          </Card>
        </Col>
        <Col >
          <Card title="1. Các môn học và hoạt động giáo dục" bordered={false}>
          <Table columns={columns} dataSource={data} bordered pagination={false}/>
          </Card>
        </Col>
        <Col >
          <Card className='col-2' title="2. Các năng lực phẩm chất" bordered={false}>
            <Table columns={columns2} dataSource={data2} bordered pagination={false}/>
            <Table style={{paddingTop:'24px'}} columns={columns3} dataSource={data3} bordered pagination={false}/>
          </Card>
        </Col>
      </Row>
    </EvaluationSheetPageStyled>
  );
};

export default EvaluationSheetPage;

const EvaluationSheetPageStyled = styled.div`
  height: auto;
  gap: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  .cards {
    display: flex;
    justify-content: center;
    gap: 100px;

    .card-item {
      background-color: ${COLOR_PRIMARY};
      /* white-space: nowrap; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      width: 255px;
      cursor: pointer;
      p {
        font-size: 32px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
    }
  }
  .col-2{
    height: 100%;
  }
  .content {
    position: relative;
    .filter-card {
      position: absolute;
      top: -100px;
      width: 100%;
    }
  }

  .ant-card-head-wrapper {
    color: ${COLOR_PRIMARY};
  }
  /* .ant-table-thead {

    th {
      background-color: ${COLOR_PRIMARY} !important;
      color: white !important;
    }

    
  }
  .ant-table-cell[scope] {
    background-color: ${COLOR_PRIMARY} !important;
      color: white !important;
  } */
`;