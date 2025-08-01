import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable.jsx';
import RevenueChart from './components/RevenueChart.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import TopInsights from './components/TopInsights.jsx'; // ✅ NEW component

const App = () => {
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [revenueBridgeData, setRevenueBridgeData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [customerConcentrationData, setCustomerConcentrationData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quarterlyRes, revenueBridgeRes, countryRes, regionRes, concentrationRes] = await Promise.all([
          axios.get('http://localhost:5000/api/v1/quarterly'),
          axios.get('http://localhost:5000/api/v1/revenue-bridge'),
          axios.get('http://localhost:5000/api/v1/countries'),
          axios.get('http://localhost:5000/api/v1/regions'),
          axios.get('http://localhost:5000/api/v1/customer-concentration')
        ]);
        setQuarterlyData(quarterlyRes.data);
        setRevenueBridgeData(revenueBridgeRes.data);
        setCountryData(countryRes.data);
        setRegionData(regionRes.data);
        setCustomerConcentrationData(concentrationRes.data);
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileType('');
    setPreviewData(null);

    if (selectedFile) {
      try {
        const text = await selectedFile.text();
        const jsonData = JSON.parse(text);
        if (!Array.isArray(jsonData)) {
          throw new Error('JSON must be an array of objects');
        }
        setPreviewData({ name: selectedFile.name, data: jsonData });
      } catch (err) {
        setError('Invalid JSON file: ' + err.message);
        setFile(null);
        setPreviewData(null);
      }
    }
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleUpload = async () => {
    console.log('handleUpload triggered');
    if (!file) {
      setError('Please select a JSON file to upload.');
      console.log('No file selected');
      return;
    }
    if (!fileType) {
      setError('Please select the file type.');
      console.log('No file type selected');
      return;
    }

    console.log('Processing file:', file.name, 'for endpoint:', fileType);
    try {
      setLoading(true);
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const endpointMap = {
        'quarterly': '/api/v1/quarterly',
        'revenue-bridge': '/api/v1/revenue-bridge',
        'countries': '/api/v1/countries',
        'regions': '/api/v1/regions',
        'customer-concentration': '/api/v1/customer-concentration',
      };

      const fieldMappings = {
        'quarterly': {
          'Customer Name': 'CustomerName',
          'Quarter 3 Revenue': 'Quarter3Revenue',
          'Quarter 4 Revenue': 'Quarter4Revenue',
          'Variance': 'Variance',
          'Percentage of Variance': 'PercentageOfVariance'
        },
        'revenue-bridge': {
          'Customer Name': 'CustomerName',
          'Quarter 3 Revenue': 'Quarter3Revenue',
          'Quarter 4 Revenue': 'Quarter4Revenue',
          'Churned Revenue': 'ChurnedRevenue',
          'New Revenue': 'NewRevenue',
          'Expansion Revenue': 'ExpansionRevenue',
          'Contraction Revenue': 'ContractionRevenue'
        },
        'countries': {
          'Country': 'Country',
          'Yearly Revenue': 'YearlyRevenue'
        },
        'regions': {
          'Region': 'Region',
          'Yearly Revenue': 'YearlyRevenue'
        },
        'customer-concentration': {
          'Customer Name': 'CustomerName',
          'Total Revenue': 'TotalRevenue'
        },
      };

      const firstItem = jsonData[0];
      console.log('Parsed JSON:', jsonData);
      console.log('First item (raw):', firstItem);
      if (!jsonData.length) {
        throw new Error('JSON array is empty');
      }

      const normalizedFirstItem = {};
      for (const key in firstItem) {
        const normalizedKey = Object.keys(fieldMappings[fileType]).find(mapKey => mapKey.toLowerCase() === key.toLowerCase());
        normalizedFirstItem[fieldMappings[fileType][normalizedKey] || key] = firstItem[key];
      }
      console.log('First item (normalized):', normalizedFirstItem);

      const expectedFields = requiredFields[fileType];
      const hasAllFields = expectedFields.every(field => field in normalizedFirstItem);
      if (!hasAllFields) {
        throw new Error(`JSON file missing required fields for ${fileType} after normalization`);
      }

      const normalizedJsonData = jsonData.map(item => {
        const normalizedItem = {};
        for (const key in item) {
          const match = Object.keys(fieldMappings[fileType]).find(k => k.toLowerCase() === key.toLowerCase());
          normalizedItem[fieldMappings[fileType][match] || key] = item[key];
        }
        return normalizedItem;
      });

      const response = await axios.post(`http://localhost:5000${endpointMap[fileType]}`, normalizedJsonData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const updatedData = response.data;
      switch (fileType) {
        case 'quarterly': setQuarterlyData(updatedData); break;
        case 'revenue-bridge': setRevenueBridgeData(updatedData); break;
        case 'countries': setCountryData(updatedData); break;
        case 'regions': setRegionData(updatedData); break;
        case 'customer-concentration': setCustomerConcentrationData(updatedData); break;
        default: break;
      }

      setError(null);
    } catch (err) {
      setError('Failed to upload file: ' + err.message);
    } finally {
      setLoading(false);
      setFile(null);
      setFileType('');
      setPreviewData(null);
    }
  };

 const handleClearData = async () => {
  try {
    setLoading(true);
    await Promise.all([
      axios.delete('http://localhost:5000/api/v1/quarterly/clear'),
      axios.delete('http://localhost:5000/api/v1/revenue-bridge/clear'),
      axios.delete('http://localhost:5000/api/v1/countries/clear'),
      axios.delete('http://localhost:5000/api/v1/regions/clear'),
      axios.delete('http://localhost:5000/api/v1/customer-concentration/clear')
    ]);

    setQuarterlyData([]);
    setRevenueBridgeData([]);
    setCountryData([]);
    setRegionData([]);
    setCustomerConcentrationData([]);
    setFile(null);
    setFileType('');
    setPreviewData(null);
    setError(null);
  } catch (err) {
    setError('Failed to clear data: ' + err.message);
  } finally {
    setLoading(false);
  }
};


  if (loading) return <div className="text-center py-8 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Revenue Intelligence Dashboard</h1>

      {/* File Upload Section */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap items-center justify-center gap-4">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Choose JSON File
        </label>
        <select
          value={fileType}
          onChange={handleFileTypeChange}
          className="p-2 border rounded"
          disabled={!file}
        >
          <option value="">Select File Type</option>
          <option value="quarterly">Quarterly Revenue</option>
          <option value="revenue-bridge">Revenue Bridge</option>
          <option value="countries">Country Revenue</option>
          <option value="regions">Region Revenue</option>
          <option value="customer-concentration">Customer Concentration</option>
        </select>
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!file || !fileType}
        >
          Upload
        </button>
        <button
          onClick={handleClearData}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {/* Preview */}
      {previewData && (
        <div className="bg-gray-100 p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Preview: {previewData.name}</h2>
          <pre className="max-h-48 overflow-auto text-sm">{JSON.stringify(previewData.data, null, 2)}</pre>
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCard
        quarterlyData={quarterlyData}
        revenueBridgeData={revenueBridgeData}
        countryData={countryData}
        regionData={regionData}
        customerConcentrationData={customerConcentrationData}
      />

      {/* Charts */}
      <RevenueChart
        quarterlyData={quarterlyData}
        customerConcentrationData={customerConcentrationData}
      />

      {/* Top Insight Tables */}
      <TopInsights countryData={countryData} quarterlyData={quarterlyData} />

      {/* Full Table */}
      <CustomerTable
        quarterlyData={quarterlyData}
        revenueBridgeData={revenueBridgeData}
      />
    </div>
  );
};

export default App;
