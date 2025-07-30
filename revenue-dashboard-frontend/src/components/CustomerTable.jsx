import React from 'react';

const CustomerTable = ({ quarterlyData, revenueBridgeData }) => {
  const combinedData = quarterlyData.map(qd => {
    const bridge = revenueBridgeData.find(rd => rd.CustomerName === qd.CustomerName) || {};
    return { ...qd, ...bridge };
  });

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Q3 Revenue</th>
            <th className="py-2 px-4 border-b">Q4 Revenue</th>
            <th className="py-2 px-4 border-b">Variance</th>
            <th className="py-2 px-4 border-b">Percentage Variance</th>
            <th className="py-2 px-4 border-b">Churned Revenue</th>
            <th className="py-2 px-4 border-b">Expansion Revenue</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.CustomerName}</td>
              <td className="py-2 px-4 border-b">{item.Quarter3Revenue?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{item.Quarter4Revenue?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{item.Variance?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{item.PercentageOfVariance?.toFixed(2) || 'N/A'}%</td>
              <td className="py-2 px-4 border-b">{item.ChurnedRevenue?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{item.ExpansionRevenue?.toLocaleString() || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;