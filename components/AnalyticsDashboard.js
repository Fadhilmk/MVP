// "use client"
// import React, { useEffect, useState } from 'react';
// import { getMessageAnalytics, getConversationAnalytics } from '../utils/apiService';
// import MessageBarChart from './MessageBarChart';
// import ConversationPieChart from './ConversationPieChart';
// import TrendLineGraph from './TrendLineGraph';
// import MessageAnalyticsCard from './MessageAnalyticsCard';
// import ConversationAnalyticsCard from './ConversationAnalyticsCard';

// const AnalyticsDashboard = () => {
//   const [messageData, setMessageData] = useState([]);
//   const [conversationData, setConversationData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const startTime = 1722340787; // Example start time (UNIX timestamp)
//           const endTime = 1723985987; // Example end time (UNIX timestamp)

//           const messages = await getMessageAnalytics(startTime, endTime);
//           setMessageData(messages);
//         } catch (error) {
//           console.error("Error fetching message analytics:", error.response);
//         }
//       };
//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <MessageAnalyticsCard data={messageData} />
//         <ConversationAnalyticsCard data={conversationData} />
//       </div>
//       <div className="grid grid-cols-1 gap-6 mt-6">
//         <MessageBarChart data={messageData} />
//         <ConversationPieChart data={conversationData} />
//         <TrendLineGraph data={messageData} />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MessageBarChart from './MessageBarChart';
// import ConversationPieChart from './ConversationPieChart';
// import TrendLineGraph from './TrendLineGraph';
// import MessageAnalyticsCard from './MessageAnalyticsCard';
// import ConversationAnalyticsCard from './ConversationAnalyticsCard';

// const whatsappBusinessAccountId = '321322121074843';
// const accessToken = 'EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD';

// const AnalyticsDashboard = () => {
//   const [messageData, setMessageData] = useState([]);
//   const [conversationData, setConversationData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const startTime = 1722340787; // Example start time (UNIX timestamp)
//         const endTime = 1723996478; // Example end time (UNIX timestamp)

//         // Fetch message analytics
//         const messageResponse = await axios.get(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`, {
//           params: {
//             fields: `analytics.start(${startTime}).end(${endTime}).granularity(DAY)`,
//             access_token: accessToken
//           }
//         });
//         setMessageData(messageResponse.data.analytics.data_points);

//         // Fetch conversation analytics
//         const conversationResponse = await axios.get(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`, {
//           params: {
//             fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(DAILY).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE"])`,
//             access_token: accessToken
//           }
//         });
//         setConversationData(conversationResponse.data.conversation_analytics.data[0].data_points);

//       } catch (error) {
//         console.error("Error fetching analytics data:", error.response);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <MessageAnalyticsCard data={messageData} />
//         <ConversationAnalyticsCard data={conversationData} />
//       </div>
//       <div className="grid grid-cols-1 gap-6 mt-6">
//         <MessageBarChart data={messageData} />
//         <ConversationPieChart data={conversationData} />
//         <TrendLineGraph data={messageData} />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

// "use client"
// import MessageBarChart from './MessageBarChart';
// import ConversationPieChart from './ConversationPieChart';
// import TrendLineGraph from './TrendLineGraph';
// import MessageAnalyticsCard from './MessageAnalyticsCard';
// import ConversationAnalyticsCard from './ConversationAnalyticsCard';

// const AnalyticsDashboard = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <MessageAnalyticsCard />
//         <ConversationAnalyticsCard />
//       </div>
//       <div className="grid grid-cols-1 gap-6 mt-6">
//         <MessageBarChart />
//         <ConversationPieChart />
//         <TrendLineGraph />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CategoryTypeCards from "./CategoryTypeCards"

// const whatsappBusinessAccountId = "321322121074843";
// const accessToken =
//   "EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD";

// const toIST = (date) => {
//   const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//   return new Date(date.getTime() + offset).toISOString().slice(0, 16);
// };

// const AnalyticsDashboard = () => {
//   const getLastMonthDateTime = () => {
//     const now = new Date();
//     const lastMonth = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );
//     return toIST(lastMonth);
//   };

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return toIST(now);
//   };

//   // State for Message Analytics
//   const [messageStartDate, setMessageStartDate] = useState(
//     getLastMonthDateTime()
//   );
//   const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
//   const [messageGranularity, setMessageGranularity] = useState("DAY");
//   const [messageData, setMessageData] = useState([]);

//   // State for Conversation Analytics
//   const [conversationStartDate, setConversationStartDate] = useState(
//     getLastMonthDateTime()
//   );
//   const [conversationEndDate, setConversationEndDate] = useState(
//     getCurrentDateTime()
//   );
//   const [conversationGranularity, setConversationGranularity] =
//     useState("DAILY");
//   const [conversationData, setConversationData] = useState([]);
//   const [categoryTotals, setCategoryTotals] = useState({});
//   const [typeTotals, setTypeTotals] = useState({});

//   const fetchMessageAnalyticsData = async () => {
//     try {
//       const startTime = new Date(messageStartDate).getTime() / 1000;
//       const endTime = new Date(messageEndDate).getTime() / 1000;

//       const messageResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
//             access_token: accessToken,
//           },
//         }
//       );
//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching message analytics data:", error.response);
//     }
//   };

//   const fetchConversationAnalyticsData = async () => {
//     try {
//       const startTime = new Date(conversationStartDate).getTime() / 1000;
//       const endTime = new Date(conversationEndDate).getTime() / 1000;

//       const conversationResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE"])`,
//             access_token: accessToken,
//           },
//         }
//       );
//       const dataPoints =
//         conversationResponse.data.conversation_analytics.data[0].data_points;
//       setConversationData(dataPoints);

//       // Calculate category totals
//       const categoryTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_category] =
//           (acc[dp.conversation_category] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate type totals
//       const typeTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_type] =
//           (acc[dp.conversation_type] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       setCategoryTotals(categoryTotals);
//       setTypeTotals(typeTotals);
//     } catch (error) {
//       console.error(
//         "Error fetching conversation analytics data:",
//         error.response
//       );
//     }
//   };

//   useEffect(() => {
//     fetchMessageAnalyticsData(); // Fetch message data on mount and when message filters change
//   }, [messageStartDate, messageEndDate, messageGranularity]);

//   useEffect(() => {
//     fetchConversationAnalyticsData(); // Fetch conversation data on mount and when conversation filters change
//   }, [conversationStartDate, conversationEndDate, conversationGranularity]);

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
//   const totalConversations = conversationData.reduce(
//     (sum, dp) => sum + dp.conversation,
//     0
//   );
//   const totalCost = conversationData
//     .reduce((sum, dp) => sum + dp.cost, 0)
//     .toFixed(2);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
//           <div className="mb-4">
//             <label className="block mb-2">Start Date:</label>
//             <input
//               type="datetime-local"
//               value={messageStartDate}
//               onChange={(e) => setMessageStartDate(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">End Date:</label>
//             <input
//               type="datetime-local"
//               value={messageEndDate}
//               onChange={(e) => setMessageEndDate(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Granularity:</label>
//             <select
//               value={messageGranularity}
//               onChange={(e) => setMessageGranularity(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             >
//               <option value="HALF_HOUR">HALF_HOUR</option>
//               <option value="DAY">DAY</option>
//               <option value="MONTH">MONTH</option>
//             </select>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={fetchMessageAnalyticsData}
//               className="bg-white text-blue-500 p-2 rounded font-bold"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 const currentDateTime = getCurrentDateTime();
//                 setMessageStartDate(currentDateTime);
//                 setMessageEndDate(currentDateTime);
//               }}
//               className="bg-gray-200 text-blue-500 p-2 rounded font-bold"
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-4">
//             <p className="text-lg font-bold">
//               Total Sent: <span className="text-yellow-300">{totalSent}</span>
//             </p>
//             <p className="text-lg font-bold">
//               Total Delivered:{" "}
//               <span className="text-yellow-300">{totalDelivered}</span>
//             </p>
//           </div>
//         </div>

//         <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Conversation Analytics</h2>
//           <div className="mb-4">
//             <label className="block mb-2">Start Date:</label>
//             <input
//               type="datetime-local"
//               value={conversationStartDate}
//               onChange={(e) => setConversationStartDate(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">End Date:</label>
//             <input
//               type="datetime-local"
//               value={conversationEndDate}
//               onChange={(e) => setConversationEndDate(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Granularity:</label>
//             <select
//               value={conversationGranularity}
//               onChange={(e) => setConversationGranularity(e.target.value)}
//               className="text-black p-2 rounded w-full"
//             >
//               <option value="DAILY">DAILY</option>
//               <option value="WEEKLY">WEEKLY</option>
//               <option value="MONTHLY">MONTHLY</option>
//             </select>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={fetchConversationAnalyticsData}
//               className="bg-white text-green-500 p-2 rounded font-bold"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 const currentDateTime = getCurrentDateTime();
//                 setConversationStartDate(currentDateTime);
//                 setConversationEndDate(currentDateTime);
//               }}
//               className="bg-gray-200 text-green-500 p-2 rounded font-bold"
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-4">
//             <p className="text-lg font-bold">
//               Total Conversations:{" "}
//               <span className="text-yellow-300">{totalConversations}</span>
//             </p>
//             <p className="text-lg font-bold">
//               Total Cost: <span className="text-yellow-300">${totalCost}</span>
//             </p>
//           </div>

//         </div>
//       </div>
//       <div className="mt-6">
//         <CategoryTypeCards categories={categoryTotals} types={typeTotals} />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryTypeCards from "./CategoryTypeCards"; // Import your CategoryTypeCards component

const whatsappBusinessAccountId = "321322121074843";
const accessToken =
  "EAAYbZBkW0wTYBO7fFOGHZCdF7zT7ZArahedhrYcGtYIXlLcm2DqZCp0EyapRZCcwfUZACQJzoLjScoVWLUpUfT4BKcPlZCtrpF0T1stHnPATEPecExIE8RjkqohsCiQ7A6qMTmNA4cPOTAQgt8O8yUv0DGMZCFDUQ2GHs66krx7zSNewyXGO06NHZBTsWnpRrkcRxZBl3SBtecIfTdrNZBKC13Yw86DUZConLZAH3mIFx6RaoUlEZD";

const toIST = (date) => {
  const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(date.getTime() + offset).toISOString().slice(0, 16);
};

const AnalyticsDashboard = () => {
  const getLastMonthDateTime = () => {
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    return toIST(lastMonth);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return toIST(now);
  };

  // State for Message Analytics
  const [messageStartDate, setMessageStartDate] = useState(
    getLastMonthDateTime()
  );
  const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
  const [messageGranularity, setMessageGranularity] = useState("DAY");
  const [messageData, setMessageData] = useState([]);

  // State for Conversation Analytics
  const [conversationStartDate, setConversationStartDate] = useState(
    getLastMonthDateTime()
  );
  const [conversationEndDate, setConversationEndDate] = useState(
    getCurrentDateTime()
  );
  const [conversationGranularity, setConversationGranularity] =
    useState("DAILY");
  const [conversationData, setConversationData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [typeTotals, setTypeTotals] = useState({});
  const [conversationDirections, setConversationDirections] = useState({});

  const fetchMessageAnalyticsData = async () => {
    try {
      const startTime = new Date(messageStartDate).getTime() / 1000;
      const endTime = new Date(messageEndDate).getTime() / 1000;

      const messageResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
            access_token: accessToken,
          },
        }
      );
      setMessageData(messageResponse.data.analytics.data_points);
    } catch (error) {
      console.error("Error fetching message analytics data:", error.response);
    }
  };

  const fetchConversationAnalyticsData = async () => {
    try {
      const startTime = new Date(conversationStartDate).getTime() / 1000;
      const endTime = new Date(conversationEndDate).getTime() / 1000;

      const conversationResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
            access_token: accessToken,
          },
        }
      );
      const dataPoints =
        conversationResponse.data.conversation_analytics.data[0].data_points;
      setConversationData(dataPoints);

      // Calculate category totals
      const categoryTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_category] =
          (acc[dp.conversation_category] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate type totals
      const typeTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_type] =
          (acc[dp.conversation_type] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate conversation direction totals
      const directionTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_direction] =
          (acc[dp.conversation_direction] || 0) + dp.conversation;
        return acc;
      }, {});

      setCategoryTotals(categoryTotals);
      setTypeTotals(typeTotals);
      setConversationDirections(directionTotals);
    } catch (error) {
      console.error(
        "Error fetching conversation analytics data:",
        error.response
      );
    }
  };

  useEffect(() => {
    fetchMessageAnalyticsData(); // Fetch message data on mount and when message filters change
  }, [messageStartDate, messageEndDate, messageGranularity]);

  useEffect(() => {
    fetchConversationAnalyticsData(); // Fetch conversation data on mount and when conversation filters change
  }, [conversationStartDate, conversationEndDate, conversationGranularity]);

  const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
  const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
  const totalConversations = conversationData.reduce(
    (sum, dp) => sum + dp.conversation,
    0
  );
  const totalCost = conversationData
    .reduce((sum, dp) => sum + dp.cost, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Message Analytics</h2>
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <input
              type="datetime-local"
              value={messageStartDate}
              onChange={(e) => setMessageStartDate(e.target.value)}
              className="text-black p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date:</label>
            <input
              type="datetime-local"
              value={messageEndDate}
              onChange={(e) => setMessageEndDate(e.target.value)}
              className="text-black p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Granularity:</label>
            <select
              value={messageGranularity}
              onChange={(e) => setMessageGranularity(e.target.value)}
              className="text-black p-2 rounded w-full"
            >
              <option value="HALF_HOUR">HALF_HOUR</option>
              <option value="DAY">DAY</option>
              <option value="MONTH">MONTH</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={fetchMessageAnalyticsData}
              className="bg-white text-blue-500 p-2 rounded font-bold"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                const currentDateTime = getCurrentDateTime();
                setMessageStartDate(currentDateTime);
                setMessageEndDate(currentDateTime);
              }}
              className="bg-gray-200 text-blue-500 p-2 rounded font-bold"
            >
              Set to Current
            </button>
          </div>
         
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Conversation Analytics</h2>
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <input
              type="datetime-local"
              value={conversationStartDate}
              onChange={(e) => setConversationStartDate(e.target.value)}
              className="text-black p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date:</label>
            <input
              type="datetime-local"
              value={conversationEndDate}
              onChange={(e) => setConversationEndDate(e.target.value)}
              className="text-black p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Granularity:</label>
            <select
              value={conversationGranularity}
              onChange={(e) => setConversationGranularity(e.target.value)}
              className="text-black p-2 rounded w-full"
            >
              <option value="DAILY">DAILY</option>
              <option value="WEEKLY">WEEKLY</option>
              <option value="MONTHLY">MONTHLY</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={fetchConversationAnalyticsData}
              className="bg-white text-green-500 p-2 rounded font-bold"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                const currentDateTime = getCurrentDateTime();
                setConversationStartDate(currentDateTime);
                setConversationEndDate(currentDateTime);
              }}
              className="bg-gray-200 text-green-500 p-2 rounded font-bold"
            >
              Set to Current
            </button>
          </div>
          
        </div>
      </div>

      {/* Pass data to CategoryTypeCards component */}
      <CategoryTypeCards
        categoryTotals={categoryTotals}
        typeTotals={typeTotals}
        conversationDirections={conversationDirections}
        totalConversations={totalConversations} // Pass totalConversations
        totalCost={totalCost}
        totalSent={totalSent} // Pass totalSent
        totalDelivered={totalDelivered}
      />
    </div>
  );
};

export default AnalyticsDashboard;
