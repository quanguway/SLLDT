import { styled } from 'styled-components';
import ChartServices from './ChartServices';
import ChartColumn from './ChartColumn';
import apisAnalytic from './services/apis';
import { useEffect, useMemo, useState } from 'react';
import { DatePicker, Form, Spin, message } from 'antd';
import InputSelect from '../../../component/atom/Input/InputSelect';
import { useDispatch } from 'react-redux';
import uiActions from '../../../services/UI/actions';
import storage from '../../../utils/sessionStorage';
import dayjs from 'dayjs';
import fetch from '../../../services/request';

const { RangePicker } = DatePicker;
export interface AnalyticType {
  total: number;
  numHTSX: number;
  numHTT: number;
  numHT: number;
  numCHT: number;
  listHTSX: any[];
  listHTT: any[];
  listHT: ListHT[];
  listCHT: ListHT[];
  avg_score: Avgscore[];
}
interface Avgscore {
  Id: string;
  Name: string;
  SubjectGroup__c?: any;
  MaMonHoc__c: string;
  avg: string;
}

interface ListHT {
  Id: string;
  Name: string;
  CreatedDate: string;
  ClassHeader__c: string;
  HocSinh__c: string;
  Type__c: string;
  ScoreDetail: ScoreDetail[];
  ability: string;
}

interface ScoreDetail {
  Id: string;
  CreatedDate: string;
  Name: string;
  Evaluation_Sheet__c: string;
  Subject__c: string;
  EvaluationType__c: string;
  Score__c?: number;
  Talent__c: string;
  Comment__c?: string;
}

export interface ISummary {
  content: string;
  icon?: React.ReactNode;
  value?: number
}

type MyDivProps = React.HTMLProps<HTMLDivElement> & {
  style?: {
    '--p': number;
  };
};


const AnalyticPage = () => {

  const [analyticData, setAnalyticData] = useState<AnalyticType>();
  const [filter, setFilter] = useState<string>('GIUA_HK_1');


  // const dataCardSummary: ISummary[] = [
  //   {
  //     value: 34,
  //     content: 'Sỉ số'
  //     // icon: <IconCustomerCircle />,
  //   },
  //   {
  //     ...getNewCustomer,
  //     // icon: <IconDiscountCircle />,
      
  //   },
  //   {
  //     ...getAverageSpendCustomer,
  //     // icon:  <IconVoucherCircle />,
  //   },
  //   {
  //     ...totalDiscount,
  //     // icon: <IconStarCircle />
  //   }
  // ];

  // const CardSummary = (values: ISummary) => {
    
  //   return (
  //     <li className={`${overview_item}`}>
  //       <div className={card_info}>
  //         <p className={info_title}>
  //           {values.money ? values.total_amount : values.total_amount}
  //           {/* {Number(values.total_amount) !== 0 ?
  //             <span className={`common-growth ${values.percent < 0 ? 'is-reduce' : values.percent === 0 ? 'no-reduce' : ''}`}>
  //               {values.percent} %
  //             </span> : null
  //           } */}
  //         </p>
  //         <p className={info_text}>{values.content}</p>
  //       </div>
  //       {/* <div>
  //         {values.icon}
  //       </div> */}
  //     </li>
  //   );
  // };
  const dispatch = useDispatch();


  const fetchApi = async () => {
    dispatch(uiActions.setLoadingPage(true));
    try {
      const class_id = storage.get('class_id');
      const res = await apisAnalytic.getAnalytic({
        eva_class_id : class_id ?? '',
        eva_type : filter
      });

      if(res?.data) {
        setAnalyticData(res?.data);
      }

    } catch (err) {
      message.error('Có lỗi xảy ra');
      
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    fetchApi();
  }, [filter]);

  const getPercent = (value: number) => {
    return value /(analyticData?.total ?? 1) * 100;
  };

  const phanLoaiHS = useMemo(() => {

    if(!analyticData) return [];

    return [
      {
        service_name: 'Hoàn Thành suất sấc',
        percent: getPercent(analyticData?.numHTSX ?? 0),
      },
      {
        service_name: 'Hoàn thành tốt',
        percent: getPercent(analyticData?.numHTT ?? 0),
      },
      {
        service_name: 'Hoàn Thành',
        percent: getPercent(analyticData?.numHT ?? 0),
      },
      {
        service_name: 'Chưa hoàn thành',
        percent: getPercent(analyticData?.numCHT ?? 0),
      }
    ];
  }, [analyticData]);

  const [nghiPhep, setNghiPhep] = useState<any>({nghiPhep: 0,
    khongPhep: 0});

  useEffect(() => {
    () => {
      fetch({
        method: 'post',
        url: 'thongke/attendance',
        body: {
          from: dayjs().format('YYYY-MM-DD'),
          to: dayjs().format('YYYY-MM-DD')
        }
      }).then((res) => {
        
        return{
          nghiPhep: res?.data?.numPhep ?? 0,
          khongPhep: res?.data?.numKhongPhep ?? 0
        };
      });
  
    };
  }, []);


  const bookingProps: MyDivProps = {
    style: {
      '--p': nghiPhep?.nghiPhep * 100 / (nghiPhep?.khongPhep + nghiPhep?.nghiPhep),
    },
  };


  if(!analyticData || !nghiPhep) return <Spin spinning={true}></Spin>;

  return(
    <AnalyticPageStyled>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <p className='title'>Thống kê</p>
{/* 
        <Form.Item>

          <InputSelect defaultValue={'GIUA_HK_1'} options={[
            {
              value: 'GIUA_HK_1',
              label: 'Giữa HK 1'
            },
            {
              value: 'CUOI_HK_1',
              label: 'Cuối HK 1'
            },
            {
              value: 'GIUA_HK_2',
              label: 'Giữa HK 2'
            },
            {
              value: 'CUOI_HK_2',
              label: 'Giữa HK 2'
            }
          ]} onChange={(value) => setFilter(value)} />
        </Form.Item> */}
      </div>


      <section className={'section_analytics'}>
        <div className={'analytics_right'}>
            <div className='left_inner'>
              
              <div
                className={`${'analytics_services'} ${'analytics_card'}`}
              >
                <div>
                  <Form.Item>

                    <InputSelect defaultValue={'GIUA_HK_1'} options={[
                      {
                        value: 'GIUA_HK_1',
                        label: 'Giữa HK 1'
                      },
                      {
                        value: 'CUOI_HK_1',
                        label: 'Cuối HK 1'
                      },
                      {
                        value: 'GIUA_HK_2',
                        label: 'Giữa HK 2'
                      },
                      {
                        value: 'CUOI_HK_2',
                        label: 'Giữa HK 2'
                      }
                    ]} onChange={(value) => setFilter(value)} />
                  </Form.Item>
                </div>
                <div className={'analytics_label'}>Điểm số</div>
                <ChartColumn data={analyticData ?? []} HK={'CUOI_HK_1'} />

                <div style={{margin: '12px 0px'}} className={'analytics_label'}>Học lực</div>
                <ChartServices revenueServices={phanLoaiHS ?? []} />
              </div>

              {/* <div className={`${'analytics_bookings'} ${'analytics_card'}`}>
                
              </div> */}
            </div>
        </div>
        <div className={'analytics_left'}>
        <div className={`${'analytics_bookings'} ${'analytics_card'}`}>
            <RangePicker style={{marginBottom: '16px'}} size='large' onChange={async (value) => {
              dispatch(uiActions.setLoadingPage(true));
              const res = await fetch({
                method: 'post',
                url: 'thongke/attendance',
                body: {
                  from: value?.[0]?.format('YYYY-MM-DD'),
                  to: value?.[1]?.format('YYYY-MM-DD')
                }
              });

              setNghiPhep({
                nghiPhep: res?.data?.numPhep ?? 0,
                khongPhep: res?.data?.numKhongPhep ?? 0
              });

              dispatch(uiActions.setLoadingPage(false));

            }} defaultValue={[dayjs(), dayjs()]} />
            <div className={'analytics_label'}>Số lượng nghỉ</div>
            <div className='pie-wrapper is-red'>
              <div className='pie animate' {...bookingProps}></div>
              <div className='pie-content'>
                <span>Total</span>
                <p>{nghiPhep?.khongPhep + nghiPhep?.nghiPhep}</p>
              </div>
            </div>
            <ul className={'pie_detail'}>
              <li>
                <span>Có phép</span>
                <span>{ nghiPhep?.nghiPhep }</span>
              </li>
              <li>
                <span>Không phép</span>
                <span>{nghiPhep?.khongPhep}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </AnalyticPageStyled>

  );
};

const AnalyticPageStyled = styled.div`
  .title { 
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .section_analytics {
    display: flex;
    gap: 20px;
    padding-bottom: 50px;
    @include tablet {
      flex-direction: column;
    }
    @include mobile {
      flex-direction: column;
    }
  }

.analytics_left {
  flex: 1;

  @include mobile {
    overflow: auto;
  }
}

.left_inner {
  @include mobile {
    min-width: 910px;
  }
}

.analytics_right,
.left_inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.analytics_right {
  width: 100%;
  @include desktop {
    display: flex;
    width: 410px;
  }
}

.bookings_circle {
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  // clip-path: inset(20px);
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border-radius: 50%;
    border: 20px solid #e95060;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
}

.analytics_card,
.overview_item {
  background: #fff;
  box-shadow: 0px 4px 24px rgba(225, 225, 239, 0.6);
  border-radius: 6px;
  padding: 24px;
  max-width: 100%;
}

.analytics_label {
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.pie_detail {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  color: var(--color-primary);
  &.is_red li::before {
    background-color: #e95060;
  }
  li {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 16px;
    &::before {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #e95060;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-60%);
    }
    &:last-child::before {
      opacity: 0.5;
    }
  }
  span:last-child {
    font-weight: 600;
  }
}

.analytics_overview {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    flex: 1;
  }
}

.overview_item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .card_info {
    flex: 1;
  }

  .info_title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-primary);
  }

  .info_text {
    font-size: 14px;
    color: var(--color-primary);
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}


@property --p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.pie-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;

  &.is-red {
    .pie {
      --c: #e95060;
    }

    &::after {
      border-color: #e95060;
    }

    .pie-content {
      color: #e95060;
      background-color: rgba(233, 80, 96, 0.1);
    }
  }

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border-radius: 50%;
    border: 20px solid #e95060;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
  }

  .pie-content {
    width: 133px;
    height: 133px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-primary-03);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e95060;

    span {
      font-weight: 500;
      font-size: 14px;
    }

    p {
      font-weight: 600;
      font-size: 28px;
      line-height: 100%;
      text-align: center;
    }
  }
}

.pie {
  --p: 90;
  --b: 20px;
  --c: #e95060;
  --w: 300px;
  position: relative;
  z-index: 11;
  width: var(--w);
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;
  font-size: 25px;
  font-weight: 600;
  font-family: sans-serif;
}

.pie:before,
.pie:after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.pie:before {
  inset: 0;
  background: radial-gradient(farthest-side, #e95060 98%, #0000) top/20px 20px no-repeat,
    conic-gradient(#e95060 calc(90 * 1%), #0000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - 20px), #000 calc(100% - 20px));
  mask: radial-gradient(farthest-side, #0000 calc(99% - 20px), #000 calc(100% - 20px));
  // background-size: 0 0, auto;
}

.pie:after {
  inset: calc(50% - 20px / 2);
  background: #e95060;
  transform: rotate(calc(90 * 3.6deg)) translateY(calc(50% - var(--w) / 2));
}

.animate {
  animation: p 1s 0.5s both;
}

.no-round:after {
  content: none;
}

@keyframes p {
  from {
    --p: 0;
  }
}
`;

export default AnalyticPage;