import ReactApexChart from 'react-apexcharts';
import { AnalyticType } from '.';

const ChartColumn = ({data, HK} : {data?: AnalyticType, HK: string}) => {

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [{
    name: HK.replaceAll('_', ' '),
    data: (data?.avg_score ?? [])?.map(o => Number(o.avg))
  }];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data?.avg_score?.map(o => o.Name) ?? [],
    },
    yaxis: {
      title: {
        text: 'Điểm số'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '' + val ;
        }
      }
    }
  };

  return (
    <ReactApexChart options={options ?? {}} series={series ?? []} type="bar" height={450} />
    
  );
};

export default ChartColumn;