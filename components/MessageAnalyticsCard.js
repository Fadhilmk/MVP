// import React from 'react';

// const MessageAnalyticsCard = ({ data }) => {
//   const totalSent = data.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = data.reduce((sum, dp) => sum + dp.delivered, 0);

//   return (
//     <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md ">
//       <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
//       <p>Total Messages Sent: <span className="font-bold">{totalSent}</span></p>
//       <p>Total Messages Delivered: <span className="font-bold">{totalDelivered}</span></p>
//     </div>
//   );
// };

// export default MessageAnalyticsCard;

// import React, { useState } from 'react';
// import axios from 'axios';

// const whatsappBusinessAccountId = '321322121074843';
// const accessToken = 'EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD';

// const MessageAnalyticsCard = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [granularity, setGranularity] = useState('DAY');
//   const [messageData, setMessageData] = useState([]);

//   const handleFilterChange = async () => {
//     try {
//       const startTime = new Date(startDate).getTime() / 1000; // Convert to UNIX timestamp
//       const endTime = new Date(endDate).getTime() / 1000; // Convert to UNIX timestamp

//       const messageResponse = await axios.get(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`, {
//         params: {
//           fields: `analytics.start(${startTime}).end(${endTime}).granularity(${granularity})`,
//           access_token: accessToken
//         }
//       });

//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching analytics data:", error.response);
//     }
//   };

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);

//   return (
//     <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
      
//       <div className="mb-4">
//         <label className="block mb-2">Start Date:</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">End Date:</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">Granularity:</label>
//         <select
//           value={granularity}
//           onChange={(e) => setGranularity(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         >
//           <option value="HALF_HOUR">HALF_HOUR</option>
//           <option value="DAY">DAY</option>
//           <option value="MONTH">MONTH</option>
//         </select>
//       </div>

//       <button
//         onClick={handleFilterChange}
//         className="bg-white text-blue-500 p-2 rounded font-bold"
//       >
//         Apply Filters
//       </button>

//       <div className="mt-4">
//         <p>Total Messages Sent: <span className="font-bold">{totalSent}</span></p>
//         <p>Total Messages Delivered: <span className="font-bold">{totalDelivered}</span></p>
//       </div>
//     </div>
//   );
// };

// export default MessageAnalyticsCard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const whatsappBusinessAccountId = '321322121074843';
// const accessToken = 'EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD';

// const MessageAnalyticsCard = () => {
//   const getLastMonthDateTime = () => {
//     const now = new Date();
//     const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//     return lastMonth.toISOString().slice(0, 16); // Returns the last month's date and time in "YYYY-MM-DDTHH:mm" format
//   };

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 16); // Returns the current date and time in "YYYY-MM-DDTHH:mm" format
//   };

//   const [startDate, setStartDate] = useState(getLastMonthDateTime());
//   const [endDate, setEndDate] = useState(getCurrentDateTime());
//   const [granularity, setGranularity] = useState('DAY');
//   const [messageData, setMessageData] = useState([]);

//   const handleFilterChange = async () => {
//     try {
//       const startTime = new Date(startDate).getTime() / 1000; // Convert to UNIX timestamp
//       const endTime = new Date(endDate).getTime() / 1000; // Convert to UNIX timestamp

//       const messageResponse = await axios.get(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`, {
//         params: {
//           fields: `analytics.start(${startTime}).end(${endTime}).granularity(${granularity})`,
//           access_token: accessToken
//         }
//       });

//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching analytics data:", error.response);
//     }
//   };

//   const handleSetToCurrent = () => {
//     const currentDateTime = getCurrentDateTime();
//     setStartDate(currentDateTime);
//     setEndDate(currentDateTime);
//   };

//   useEffect(() => {
//     handleFilterChange(); // Fetch default data on mount
//   }, []);

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);

//   return (
//     <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
      
//       <div className="mb-4">
//         <label className="block mb-2">Start Date:</label>
//         <input
//           type="datetime-local"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">End Date:</label>
//         <input
//           type="datetime-local"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">Granularity:</label>
//         <select
//           value={granularity}
//           onChange={(e) => setGranularity(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         >
//           <option value="HALF_HOUR">HALF_HOUR</option>
//           <option value="DAY">DAY</option>
//           <option value="MONTH">MONTH</option>
//         </select>
//       </div>

//       <div className="flex space-x-2">
//         <button
//           onClick={handleFilterChange}
//           className="bg-white text-blue-500 p-2 rounded font-bold"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={handleSetToCurrent}
//           className="bg-gray-200 text-blue-500 p-2 rounded font-bold"
//         >
//           Set to Current
//         </button>
//       </div>

//       <div className="mt-4">
//         <p className="text-lg font-bold">Total Messages Sent: <span className="text-yellow-300">{totalSent}</span></p>
//         <p className="text-lg font-bold">Total Messages Delivered: <span className="text-yellow-300">{totalDelivered}</span></p>
//       </div>
//     </div>
//   );
// };

// export default MessageAnalyticsCard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const whatsappBusinessAccountId = '321322121074843';
// const accessToken = 'EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD';

// const MessageAnalyticsCard = () => {
//   const getLastMonthDateTime = () => {
//     const now = new Date();
//     const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//     return lastMonth.toISOString().slice(0, 16); // Last month's date and time
//   };

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 16); // Current date and time
//   };

//   const [startDate, setStartDate] = useState(getLastMonthDateTime());
//   const [endDate, setEndDate] = useState(getCurrentDateTime());
//   const [granularity, setGranularity] = useState('DAY');
//   const [messageData, setMessageData] = useState([]);

//   const handleFilterChange = async () => {
//     try {
//       const startTime = new Date(startDate).getTime() / 1000; // Convert to UNIX timestamp
//       const endTime = new Date(endDate).getTime() / 1000; // Convert to UNIX timestamp

//       const messageResponse = await axios.get(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`, {
//         params: {
//           fields: `analytics.start(${startTime}).end(${endTime}).granularity(${granularity})`,
//           access_token: accessToken
//         }
//       });

//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching analytics data:", error.response);
//     }
//   };

//   const handleSetToCurrent = () => {
//     const currentDateTime = getCurrentDateTime();
//     setStartDate(currentDateTime);
//     setEndDate(currentDateTime);
//   };

//   useEffect(() => {
//     handleFilterChange(); // Fetch data on mount
//   }, [startDate, endDate, granularity]); // Add dependencies to refetch data on filter change

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);

//   return (
//     <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>

//       <div className="mb-4">
//         <label className="block mb-2">Start Date:</label>
//         <input
//           type="datetime-local"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">End Date:</label>
//         <input
//           type="datetime-local"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2">Granularity:</label>
//         <select
//           value={granularity}
//           onChange={(e) => setGranularity(e.target.value)}
//           className="text-black p-2 rounded w-full"
//         >
//           <option value="HALF_HOUR">HALF_HOUR</option>
//           <option value="DAILY">DAY</option>
//           <option value="MONTHLY">MONTH</option>
//         </select>
//       </div>

//       <div className="flex space-x-2">
//         <button
//           onClick={handleFilterChange}
//           className="bg-white text-blue-500 p-2 rounded font-bold"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={handleSetToCurrent}
//           className="bg-gray-200 text-blue-500 p-2 rounded font-bold"
//         >
//           Set to Current
//         </button>
//       </div>

//       <div className="mt-4">
//         <p className="text-lg font-bold">Total Sent: <span className="text-yellow-300">{totalSent}</span></p>
//         <p className="text-lg font-bold">Total Delivered: <span className="text-yellow-300">{totalDelivered}</span></p>
//       </div>
//     </div>
//   );
// };

// export default MessageAnalyticsCard;



import React from 'react';

const MessageAnalyticsCard = ({ startDate, endDate, granularity, totalSent, totalDelivered, setStartDate, setEndDate, setGranularity }) => {
  const handleFilterChange = async () => {
    // Data fetching is managed by AnalyticsDashboard now, no need to fetch here
  };

  const handleSetToCurrent = () => {
    const currentDateTime = getCurrentDateTime();
    setStartDate(currentDateTime);
    setEndDate(currentDateTime);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Current date and time
  };

  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>

      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="text-black p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">End Date:</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="text-black p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Granularity:</label>
        <select
          value={granularity}
          onChange={(e) => setGranularity(e.target.value)}
          className="text-black p-2 rounded w-full"
        >
          <option value="HALF_HOUR">HALF_HOUR</option>
          <option value="DAILY">DAY</option>
          <option value="MONTHLY">MONTH</option>
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleFilterChange}
          className="bg-white text-blue-500 p-2 rounded font-bold"
        >
          Apply Filters
        </button>
        <button
          onClick={handleSetToCurrent}
          className="bg-gray-200 text-blue-500 p-2 rounded font-bold"
        >
          Set to Current
        </button>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Total Sent: <span className="text-yellow-300">{totalSent}</span></p>
        <p className="text-lg font-bold">Total Delivered: <span className="text-yellow-300">{totalDelivered}</span></p>
      </div>
    </div>
  );
};

export default MessageAnalyticsCard;
