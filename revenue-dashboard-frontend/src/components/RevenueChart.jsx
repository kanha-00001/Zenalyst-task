import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const RevenueChart = ({ quarterlyData, customerConcentrationData }) => {
  const barData = {
    labels: quarterlyData.map(item => item.CustomerName),
    datasets: [
      {
        label: 'Q3 Revenue',
        data: quarterlyData.map(item => item.Quarter3Revenue || 0),
        backgroundColor: '#FF6B6B',
      },
      {
        label: 'Q4 Revenue',
        data: quarterlyData.map(item => item.Quarter4Revenue || 0),
        backgroundColor: '#4ECDC4',
      },
    ],
  };

  const pieData = {
    labels: customerConcentrationData.map(item => item.CustomerName),
    datasets: [
      {
        data: customerConcentrationData.map(item => item.TotalRevenue || 0),
        backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { callbacks: { label: context => `$${context.raw.toLocaleString()}` } },
    },
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Q3 vs Q4 Revenue</h2>
        <Bar data={barData} options={options} />
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Customer Concentration</h2>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;