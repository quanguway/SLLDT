import ReactApexChart from 'react-apexcharts';
// import styled from 'styled-components';

interface PieChartData {
  type: string;
  value: number;
}

const ChartServices = ({ revenueServices }: { revenueServices: any }) => {
  // const colors = ['#3B82F6', '#22C55E', '#EAB308', '#F97316'];


  const pieChartData: PieChartData[] = revenueServices?.map((o: any) => ({
    type: o.service_name,
    value: o.percent
  }));
  // const prices = revenueServices??.map((o: any) => (`${o?.total_amount ?? 0}`));

  // const config = {
  //   appendPadding: 10,
  //   data: pieChartData,
  //   angleField: 'value',
  //   colorField: 'type',
  //   color: colors,
  //   radius: 1,
  //   innerRadius: 0.6,
  //   label: {
  //     type: 'inner',
  //     offset: '-50%',
  //     style: {
  //       textAlign: 'center',
  //     },
  //     autoRotate: false,
  //     content:function content(_ref: any) {
  //       return ''.concat(_ref.value, '%');
  //     },
  //   },
  //   interactions: [
  //     {
  //       type: 'element-selected',
  //     },
  //     {
  //       type: 'element-active',
  //     },
  //   ],
  //   statistic: {
  //     title: false as const,
  //     content: {
  //       style: {
  //         whiteSpace: 'pre-wrap',
  //         overflow: 'hidden',
  //         textOverflow: 'ellipsis',
  //       },
  //       content: '',
  //     },
  //   },
  //   legend: false as false | any,
  // };



  const option: ApexCharts.ApexOptions = {
    chart: {
      width: 1,
      type: 'donut',
    },
    legend: {
      position: 'bottom'
    },
    labels: pieChartData?.map(o => (o.type)) as string[],
    responsive: [{
      breakpoint: 580,
      options: {
        chart: {
          width: 300
        },
      }
    }]
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <ReactApexChart options={option} series={pieChartData?.map(o => (o.value)) ?? []} type='donut' width={500} />
      </div>
    
      {/* <ListItemsStyled>
        <ul className='list-items'>
          {pieChartData?.map((pie, index) => {
            const { value, type } = pie;
            if (value === 0) {
              return null;
            }
            return (
                <li className='item' key={index}>
                  <span
                    className='item-type'
                    style={{ background: colors[index] }}
                  ></span>
                  <span className='item-label'>{type}</span>
                  <span className='item-value' style={{ color: colors[index] }}>
                    <IconTrendUp />
                    {value}
                  </span>
                  <span className='item-price'>{prices[index]}</span>
                </li>

            );
          })}
        </ul>
      </ListItemsStyled> */}
    </>
  );
};

export default ChartServices;

// const ListItemsStyled = styled.div`
//   .list-items {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }
//   .item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-size: 14px;
//     color: #363565;
//   }
//   .item-type {
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     position: relative;
//     &:after {
//       content: '';
//       display: block;
//       width: 12px;
//       height: 12px;
//       position: absolute;
//       background: inherit;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       border-radius: 50%;
//       opacity: 0.3;
//     }
//   }
//   .item-label {
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
//   .item-value {
//     display: inline-flex;
//     align-items: center;
//     color: #3b82f6;
//     gap: 4px;
//   }
//   .value-icon {
//     display: inline-flex;
//     align-items: center;
//   }
//   .item-price {
//     text-align: right;
//     margin-left: auto;
//   }
// `;
