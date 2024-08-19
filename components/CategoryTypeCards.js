// import React from 'react';

// const CategoryTypeCards = ({ categories, types }) => {
//   return (
//     <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       <div className="bg-gray-200 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Categories</h2>
//         {Object.entries(categories).map(([category, total]) => (
//           <div key={category} className="bg-white p-4 rounded-lg mb-4 shadow-sm">
//             <h3 className="text-lg font-bold">{category}</h3>
//             <p className="text-lg">Total Conversations: {total}</p>
//           </div>
//         ))}
//       </div>
//       <div className="bg-gray-200 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Types</h2>
//         {Object.entries(types).map(([type, total]) => (
//           <div key={type} className="bg-white p-4 rounded-lg mb-4 shadow-sm">
//             <h3 className="text-lg font-bold">{type}</h3>
//             <p className="text-lg">Total Conversations: {total}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryTypeCards;

import React from "react";

const CategoryTypeCards = ({
  categoryTotals,
  typeTotals,
  conversationDirections,
  totalConversations,
  totalCost,
  totalSent,
  totalDelivered,
}) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category Totals Card */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Category Totals</h2>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category} className="mb-2">
              <p className="text-xl font-bold">{category}</p>
              <p className="text-2xl font-bold text-shadow">{total}</p>
            </div>
          ))}
        </div>

        {/* Type Totals Card */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Type Totals</h2>
          {Object.entries(typeTotals).map(([type, total]) => (
            <div key={type} className="mb-2">
              <p className="text-xl font-bold">{type}</p>
              <p className="text-2xl font-bold text-shadow">{total}</p>
            </div>
          ))}
        </div>

        {/* Conversation Directions Card */}
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Conversation Directions</h2>
          {Object.entries(conversationDirections).map(([direction, total]) => (
            <div key={direction} className="mb-2">
              <p className="text-xl font-bold">{direction} :</p>
              <p className="text-2xl font-bold text-shadow">{total}</p>
            </div>
          ))}
        </div>

        {/* Summary Card for Total Conversations and Total Cost */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="mb-4">
            <p className="text-xl font-bold">Total Conversations:</p>
            <p className="text-2xl font-bold text-shadow">{totalConversations}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-bold">Total Cost:</p>
            <p className="text-2xl font-bold text-yellow-300 text-shadow">${totalCost}</p>
          </div>
        </div>

        {/* Message Totals Card */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Message Totals</h2>
          <div className="mb-4">
            <p className="text-xl font-bold">Total Messages Sent:</p>
            <p className="text-2xl font-bold text-shadow">{totalSent}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-bold">Total Messages Delivered:</p>
            <p className="text-2xl font-bold text-shadow">{totalDelivered}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTypeCards;
