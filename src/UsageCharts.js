import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import loadingGif from './Loading_2.gif';

// Register the required components
Chart.register(...registerables);

const UsageCharts = ({ token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const response = await fetch('https://render-ecotrack.onrender.com/getDailyUsage', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch daily usage');
        }

        const usageData = await response.json();
        console.log(usageData);
        setData(usageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [token]);

  if (loading) {
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img 
          src={loadingGif} 
          alt="Loading..." 
          style={{ width: '100px', height: '100px', alignSelf: 'center' }} 
        />
      </div>
    )
  }


  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Prepare data for the BarChart
  const labels = data.map(item => item.date);
  const waterUsageData = data.map(item => item.totalWaterUsage);
  const electricityUsageData = data.map(item => item.totalElectricityUsage);

  const waterChartData = {
    labels,
    datasets: [
      {
        label: 'Water (L)',
        data: waterUsageData,
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
      },
    ],
  };

  const electricityChartData = {
    labels,
    datasets: [
      {
        label: 'Electricity (KWh)',
        data: electricityUsageData,
        backgroundColor: '#d25639',
      },
    ],
  };

  return (
    <div
      className="container mt-4"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        gap : '50px'
      }}
    >
            <h1 style={{ textAlign: 'center', color: 'rgb(0, 137, 193)', width: '100%' }}>Weekly consumption insights</h1>
      {/* Water Usage Card */}
      <div
        className="card"
        style={{
          flex: "1 1 45%", // Adjusts width to 45% of the container
          maxWidth: "900px",
          minWidth: "300px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div
          className="card-header"
          style={{
            borderRadius: 10,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <h2 className="mb-0" style={{ color: "rgb(0, 137, 193)" }}>
            Daily Water Usage
          </h2>
        </div>
        <div className="card-body">
          <Bar
            data={waterChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
  
      {/* Electricity Usage Card */}
      <div
        className="card"
        style={{
          flex: "1 1 45%", // Adjusts width to 45% of the container
          maxWidth: "900px",
          minWidth: "300px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <h2 className="mb-0" style={{ color: "rgb(0, 137, 193)" }}>
            Daily Electricity Usage
          </h2>
        </div>
        <div className="card-body">
          <Bar
            data={electricityChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
  

  
};




export default UsageCharts;
