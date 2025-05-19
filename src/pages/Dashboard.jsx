import Chart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { getAppointment } from '../Apis/Appointment/appointmentApi';

function Dashboard() {
 const { data,isLoading } = useQuery('getAppointment', getAppointment)
  var options = {
    series: [44, 55],
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  const series = [44, 55];

  return (
    <div>
      <Chart options={options} 
      series={series} 
      type="donut" 
      width="380" />
    </div>
  )
}

export default Dashboard