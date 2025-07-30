import React from 'react';

const SummaryCard = ({ quarterlyData, revenueBridgeData, countryData, regionData, customerConcentrationData }) => {
  const totalQ3Revenue = quarterlyData.reduce((sum, item) => sum + (item.Quarter3Revenue || 0), 0).toLocaleString();
  const totalQ4Revenue = quarterlyData.reduce((sum, item) => sum + (item.Quarter4Revenue || 0), 0).toLocaleString();
  const totalYearlyRevenue = [...countryData, ...regionData]
    .reduce((sum, item) => sum + (item.YearlyRevenue || 0), 0)
    .toLocaleString();
  const totalConcentration = customerConcentrationData.reduce((sum, item) => sum + (item.TotalRevenue || 0), 0).toLocaleString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium">Total Q3 Revenue</h3>
        <p className="text-2xl">${totalQ3Revenue}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium">Total Q4 Revenue</h3>
        <p className="text-2xl">${totalQ4Revenue}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium">Total Yearly Revenue</h3>
        <p className="text-2xl">${totalYearlyRevenue}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-medium">Total Concentration</h3>
        <p className="text-2xl">${totalConcentration}</p>
      </div>
    </div>
  );
};

export default SummaryCard;