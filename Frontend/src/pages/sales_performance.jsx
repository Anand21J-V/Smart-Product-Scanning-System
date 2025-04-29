import React, { useState } from 'react';

const SalesPerformanceChart = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);

  const fetchChart = async () => {
    try {
      const response = await fetch('http://192.168.114.199:5001/sales_performance', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chart');
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImgSrc(imageObjectURL);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchChart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Load Sales Performance Chart
      </button>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      {imgSrc && (
        <div className="mt-4">
          <img src={imgSrc} alt="Sales Performance" className="rounded shadow" />
        </div>
      )}
    </div>
  );
};

export default SalesPerformanceChart;
