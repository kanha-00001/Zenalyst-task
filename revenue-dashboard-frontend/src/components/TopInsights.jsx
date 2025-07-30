import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const TopInsights = ({ countryData, quarterlyData }) => {
  // Ensure data is valid
  const validCountryData = Array.isArray(countryData) ? countryData : [];
  const validQuarterlyData = Array.isArray(quarterlyData) ? quarterlyData : [];

  // Top 10 Countries by Revenue
  const sortedByRevenue = [...validCountryData].sort((a, b) => (b.YearlyRevenue || 0) - (a.YearlyRevenue || 0));
  const topCountries = sortedByRevenue.slice(0, 10);

  // Top 10 Revenue Growth (Q3 to Q4) from quarterlyData
  const sortedByGrowth = [...validQuarterlyData].sort((a, b) => {
    const growthA = ((a.Quarter4Revenue || 0) - (a.Quarter3Revenue || 0)) / (a.Quarter3Revenue || 1) * 100;
    const growthB = ((b.Quarter4Revenue || 0) - (b.Quarter3Revenue || 0)) / (b.Quarter3Revenue || 1) * 100;
    return growthB - growthA;
  });
  const topGrowth = sortedByGrowth.slice(0, 10);

  // Total revenue for share calculation
  const totalRevenue = validCountryData.reduce((sum, item) => sum + (item.YearlyRevenue || 0), 0);

  if (validCountryData.length === 0 && validQuarterlyData.length === 0) {
    return <div className="p-4 bg-gray-100 rounded shadow text-center">No country or quarterly data available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Top 10 Countries by Revenue */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Top 10 Countries by Revenue</h2>
        <Bar
          data={{
            labels: topCountries.map(item => item.Country || 'Unknown'),
            datasets: [{
              label: 'Revenue ($M)',
              data: topCountries.map(item => item.YearlyRevenue || 0),
              backgroundColor: '#4ECDC4',
            }],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: context => `$${context.raw.toLocaleString()}M`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Revenue ($M)' },
              },
            },
          }}
        />
      </div>

      {/* Top 10 Companies by Q3-Q4 Revenue Growth */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Top 10 Q3-Q4 Revenue Growth</h2>
        <Bar
          data={{
            labels: topGrowth.map(item => item.CustomerName || 'Unknown'),
            datasets: [{
              label: 'Growth (%)',
              data: topGrowth.map(item => ((item.Quarter4Revenue || 0) - (item.Quarter3Revenue || 0)) / (item.Quarter3Revenue || 1) * 100),
              backgroundColor: '#FF6B6B',
            }],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: context => `${context.raw.toFixed(2)}%`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Growth (%)' },
              },
            },
          }}
        />
      </div>

      {/* Revenue Share by Country (Pie Chart) */}
      <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">Revenue Share by Country</h2>
        <Pie
          data={{
            labels: topCountries.map(item => item.Country || 'Unknown'),
            datasets: [{
              label: 'Revenue Share (%)',
              data: topCountries.map(item => ((item.YearlyRevenue || 0) / totalRevenue * 100).toFixed(2) || 0),
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#1A535C', '#5CDB95', '#FC4445', '#C38D9E', '#FFB6B9', '#4B778D', '#7D5A5A'],
            }],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: context => `${context.label}: ${context.raw}%`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopInsights;