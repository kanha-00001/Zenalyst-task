import React, { useState } from 'react';

const CustomerTable = ({ quarterlyData, revenueBridgeData }) => {
  const [sortOption, setSortOption] = useState('none');

  // Combine data if both are provided, prioritizing quarterlyData
  const tableData = quarterlyData.length > 0 ? quarterlyData : revenueBridgeData;

  // Sort function
  const sortedData = [...tableData].sort((a, b) => {
    if (sortOption === 'none') return 0;
    if (sortOption === 'customerName') return (a.CustomerName || '').localeCompare(b.CustomerName || '');
    if (sortOption === 'q3Revenue') return (a.Quarter3Revenue || 0) - (b.Quarter3Revenue || 0);
    if (sortOption === 'q4Revenue') return (a.Quarter4Revenue || 0) - (b.Quarter4Revenue || 0);
    return 0;
  });

  if (!tableData || tableData.length === 0) {
    return <div className="p-4 bg-gray-100 rounded shadow text-center">No customer data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Table</h2>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="none">Sort By</option>
          <option value="customerName">Customer Name</option>
          <option value="q3Revenue">Q3 Revenue</option>
          <option value="q4Revenue">Q4 Revenue</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Q3 Revenue ($M)</th>
            <th className="border p-2">Q4 Revenue ($M)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className="border p-2">{item.CustomerName || 'N/A'}</td>
              <td className="border p-2">{(item.Quarter3Revenue || 0).toFixed(2)}</td>
              <td className="border p-2">{(item.Quarter4Revenue || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;