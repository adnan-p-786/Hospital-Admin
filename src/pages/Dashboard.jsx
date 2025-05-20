import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { getAppointment } from '../Apis/Appointment/appointmentApi';

function Dashboard() {
  const { data: response, isLoading, isError } = useQuery('getAppointment', getAppointment);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const appointments = response?.data ?? [];

  // Count gender distribution
  const maleCount = appointments.filter(app => app.Gender.toLowerCase() === 'male').length;
  const femaleCount = appointments.filter(app => app.Gender.toLowerCase() === 'female').length;

  const genderSeries = [maleCount, femaleCount];
  const genderOptions = {
    labels: ['Male', 'Female'],
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' },
      },
    }],
  };

  const contactChartState = {
    series: [25, 15, 44, 55, 41, 17],
    options: {
      chart: {
        width: '100%',
        height: '100%',
        type: 'pie',
      },
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      theme: {
        monochrome: { enabled: true },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      grid: {
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
      },
      legend: { show: false },
    },
  };

  return (
    <div className='grid grid-cols-2 gap-4 p-4'>
      <div>
        <h1 className='text-center text-2xl mb-4 font-semibold'>Appointments by Gender</h1>
        <Chart options={genderOptions} series={genderSeries} type="donut" width="100%" />
      </div>
      <div>
        <h1 className='text-center text-2xl mb-4 font-semibold'>Contacts by Day</h1>
        <ReactApexChart
          options={contactChartState.options}
          series={contactChartState.series}
          type="pie"
          width="100%"
        />
      </div>
    </div>
  );
}

export default Dashboard;
