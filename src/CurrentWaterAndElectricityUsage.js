// import React, { useState, useEffect } from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import './index.css';

// const CurrentWaterAndElectricityUsage = ({ token }) => {
//   const [usageData, setUsageData] = useState({
//     waterUsage: 0,
//     electricityUsage: 0,
//     totalWaterUsage: 0,
//     totalElectricityUsage: 0,
//     percentageOfWaterUsed:0,
//     percentageOfElectricityUsed:0,
//     localDateTime: new Date().toISOString(),
//   });

//   // Function to fetch usage data from the server
//   const fetchUsageData = () => {
//     fetch('https://render-ecotrack.onrender.com/getUsage', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       setUsageData({
//         waterUsage: data.waterUsage,
//         electricityUsage: data.electricityUsage,
//         totalWaterUsage: data.totalWaterUsage,
//         totalElectricityUsage: data.totalElectricityUsage,
//         percentageOfElectricityUsed : data.percentageOfElectricityUsed.toFixed(2),
//         percentageOfWaterUsed : data.percentageOfWaterUsed.toFixed(1),
//         localDateTime: data.localDateTime || new Date().toISOString(),
//       });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   useEffect(() => {
//     fetchUsageData(); // Initial fetch
//     const interval = setInterval(fetchUsageData, 5000); // Fetch every 5 seconds
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [token]);

//   return (
//     <>
//     <div className="contain_er" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding : 50}}>
//       <h1 style={{ textAlign: 'center', color: 'rgb(0, 137, 193)', width: '100%' }}>Dashboard</h1>

//       <div className='text-center' style={{ width: '300px',padding:"5px", margin: '20px', boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
//             <div style={{ 
//                 backgroundColor: '#fff', 
//                 textAlign: 'center'
//               }}>
//               <h2 className="mb-0" style={{ color: 'rgb(0, 137, 193)' }}>Water Usage</h2>
//             </div>
//           <div className=" widget text-center">
//           <CircularProgressbar
//             value={usageData.waterUsage / 5 * 100}
//             text={`${usageData.waterUsage} L`}
//             styles={buildStyles({
//               pathColor: 'rgb(0, 137, 193)',
//               textColor: 'black',
//               trailColor: '#d6d6d6',
//             })}
//           />
//           <p style={{ fontSize: '16px', color: '#555', margin: '10px 0' }}>Water Usage</p>
//           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//             <span style={{ fontWeight: 'bold'}}>Total Water Usage: {usageData.totalWaterUsage.toFixed(2)} L</span>
//           </div>

//         </div>
//       </div>

//       <div style={{ width: '300px',padding:"5px", margin: '20px', boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
//       <div style={{ 
//                 backgroundColor: '#fff', 
//                 textAlign: 'center'
//               }}>
//               <h2 className="mb-0" style={{ color: 'rgb(0, 137, 193)' }}>Electricity Usage</h2>
//             </div>
//         <div className=" widget text-center">
//           <CircularProgressbar
//             value={usageData.electricityUsage / 1500 * 100}
//             text={`${usageData.electricityUsage} W`}
//             styles={buildStyles({
//               pathColor: 'rgb(210, 86, 57)',
//               textColor: 'black',
//               trailColor: '#d6d6d6',
//             })}
//           />
//           <p style={{ fontSize: '16px', color: '#555', margin: '10px 0' }}>Electricity Usage</p>
//           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//             <span style={{ fontWeight: 'bold' }}>Total Electricity Usage: {usageData.totalElectricityUsage.toFixed(4)} W</span>
//           </div>
//         </div>
//       </div>

//       <div className=" " style={{ width: '210px', margin: '20px', padding:"5px", boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
//         <div  style={{ 
//                 backgroundColor: '#fff', 
//                 textAlign: 'center'
//               }}>
//               <h2 className="mb-0" style={{ color: 'rgb(0, 137, 193)' }}>Utilization %</h2>
//             </div>
        
//         <div className=" widget text-center">
//           <CircularProgressbar
//             value={usageData.percentageOfWaterUsed}
//             text={`${usageData.percentageOfWaterUsed} %`}
//             styles={buildStyles({
//               pathColor: 'rgb(0, 137, 193)',
//               textColor: 'black',
//               trailColor: '#d6d6d6',
//             })}
//           />
//           <p style={{ fontSize: '16px', color: '#555', margin: '10px 0' }}>Water Usage</p>
//           <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//             <span style={{ fontWeight: 'bold' }}>Utilization %</span>
//           </div>
//         </div>
//         </div>
//         <div style={{ width: '210px',margin: '20px',padding:"5px", boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
//         <div style={{ 
//                 backgroundColor: '#fff', 
//                 textAlign: 'center'
//               }}>
//               <h2 className="mb-0" style={{ color: 'rgb(0, 137, 193)' }}>Utilization %</h2>
//             </div>
//             <div className=" widget text-center">
//           <CircularProgressbar
//             value={usageData.percentageOfElectricityUsed}
//             text={`${usageData.percentageOfElectricityUsed} %`}
//             styles={buildStyles({
//               pathColor: 'rgb(210, 86, 57)',
//               textColor: 'black',
//               trailColor: '#d6d6d6',
//             })}
//           />
//           <p style={{ fontSize: '16px', color: '#555', margin: '10px 0' }}>Electricity Usage</p>
//           <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//             <span style={{ fontWeight: 'bold' }}>Utilization %</span>
//           </div>
//         </div>
//       </div>
//       </div>
//      <p style={{ textAlign: 'center', color: '#555', margin : '10px' }}>Last Updated: {new Date(usageData.localDateTime).toLocaleString()}</p>
//      </>
    
//   );
// };

// export default CurrentWaterAndElectricityUsage;


import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.css';

const CurrentWaterAndElectricityUsage = ({ token }) => {
  const [usageData, setUsageData] = useState({
    waterUsage: 0,
    electricityUsage: 0,
    localDateTime: new Date().toISOString(),
  });

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8083/getUsage?token=${token}`);

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      try {
        if (event.data.startsWith("{")) {  // Process only valid JSON
          const data = JSON.parse(event.data);
          setUsageData({
            waterUsage: data.waterUsage,
            electricityUsage: data.electricityUsage,
            localDateTime: data.localDateTime || new Date().toISOString(),
          });
        } else {
          console.warn("Ignored non-JSON message:", event.data);
        }
      } catch (error) {
        console.error("WebSocket Message Error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket Disconnected:", event.reason);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  return (
    <>
      <div className="contain_er" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: 50 }}>
        <h1 style={{ textAlign: 'center', color: 'rgb(0, 137, 193)', width: '100%' }}>Dashboard</h1>

        <div className='text-center' style={{ width: '300px', padding: '5px', margin: '20px', boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ color: 'rgb(0, 137, 193)' }}>Water Usage</h2>
          <CircularProgressbar
            value={(usageData.waterUsage / 5) * 100}
            text={`${usageData.waterUsage} L`}
            styles={buildStyles({ pathColor: 'rgb(0, 137, 193)', textColor: 'black', trailColor: '#d6d6d6' })}
          />
        </div>

        <div style={{ width: '300px', padding: '5px', margin: '20px', boxShadow: '0 10px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ color: 'rgb(0, 137, 193)' }}>Electricity Usage</h2>
          <CircularProgressbar
            value={(usageData.electricityUsage / 1500) * 100}
            text={`${usageData.electricityUsage} W`}
            styles={buildStyles({ pathColor: 'rgb(210, 86, 57)', textColor: 'black', trailColor: '#d6d6d6' })}
          />
        </div>
      </div>
      <p style={{ textAlign: 'center', color: '#555', margin: '10px' }}>
        Last Updated: {new Date(usageData.localDateTime).toLocaleString()}
      </p>
    </>
  );
};

export default CurrentWaterAndElectricityUsage;
