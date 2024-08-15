// "use client"

// // "use client"
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import useSWR from 'swr';

// // Fetcher function for SWR
// const fetcher = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch');
//   }
//   return response.json();
// };

// // Template details fetcher
// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(`https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBO9anrrC3M3xwxeri2Y5ktNer6zfdx23sZAnpkzIVKK6YV176EAdXWstebaHi3vHp7jNidcY80GFmZBa0ZBBY0ipXUC4cdShF345mhV99I1lrqLft4zWPONEHUbCZAdZBAf8oHpxZB2hOpxeZBii53oScIloUKhPlNdhmHPKwZAxZBMuzfOdZASWP0CT4ZCJcjE87aj1phPUSI1pTCYMdKxY2FANea5Ats5aKL4ZD`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch template details');
//   }
//   return response.json();
// };

// const TemplatesPage = () => {
//   const { data, error } = useSWR('/api/templates', fetcher);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (selectedTemplate) {
//       fetchTemplateDetails(selectedTemplate.id)
//         .then(data => setTemplateDetails(data))
//         .catch(error => console.error('Error fetching template details:', error));
//     }
//   }, [selectedTemplate]);

//   if (error) return <div>Failed to load templates.</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">WhatsApp Message Templates</h1>
//       <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {data.data.map(template => (
//           <li
//             key={template.id}
//             className={`template-card rounded shadow hover:shadow-md p-4 bg-white ${
//               template.status === 'APPROVED' ? 'border-2 border-green-500' :
//               template.status === 'PENDING' ? 'border-2 border-yellow-400' :
//               template.status === 'REJECTED' ? 'border-2 border-red-500' : ''
//             }`}
//           >
//             <div className="flex items-center justify-between w-full">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-800">{template.name}</h3>
//                 {template.status === 'APPROVED' && (
//                   <div className="flex items-center mt-1">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="ml-2 text-sm text-green-500">Active</span>
//                   </div>
//                 )}
//               </div>
//               <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
//               </svg>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {selectedTemplate && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">Selected Template Details</h2>
//           {templateDetails ? (
//             <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(templateDetails, null, 2)}</pre>
//           ) : (
//             <div>Loading template details...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplatesPage;

// "use client"

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import useSWR, { mutate } from 'swr';

// // Fetcher function for SWR
// const fetcher = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch');
//   }
//   return response.json();
// };


// const TemplatesPage = () => {
//   const { data, error } = useSWR('/api/templates', fetcher, {
//     revalidateOnFocus: true, // Revalidate when the page gets focus
//     refreshInterval: 60000, // Refresh data every 60 seconds
//   });
  
//   const router = useRouter();

//   if (error) return <div>Failed to load templates.</div>;
//   if (!data) return <div>Loading...</div>;

//   const handleRefresh = () => {
//     mutate('/api/templates');
//   };

//   const handleTemplateClick = (id) => {
//     router.push(`/templates/${id}`);
//   };
  
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">WhatsApp Message Templates</h1>
//       <button onClick={handleRefresh}>Refresh Templates</button>
//       <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {data.data.map(template => (
//           <li
//             key={template.id}
//             className={`template-card rounded shadow hover:shadow-md p-4 bg-white cursor-pointer ${
//               template.status === 'APPROVED' ? 'border-2 border-green-500' :
//               template.status === 'PENDING' ? 'border-2 border-yellow-400' :
//               template.status === 'REJECTED' ? 'border-2 border-red-500' : ''
//             }`}
//             onClick={() => handleTemplateClick(template.id)}
//           >
//             <div className="flex items-center justify-between w-full">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-800">{template.name}</h3>
//                 {template.status === 'APPROVED' && (
//                   <div className="flex items-center mt-1">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="ml-2 text-sm text-green-500">Active</span>
//                   </div>
//                 )}
//               </div>
//               <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
//               </svg>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TemplatesPage;

"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      setTemplates(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleRefresh = () => {
    fetchTemplates();
  };

  const handleTemplateClick = (id) => {
    router.push(`/templates/${id}`);
  };

  if (error) return <div>Failed to load templates.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WhatsApp Message Templates</h1>
      <button onClick={handleRefresh}>Refresh Templates</button>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <li
            key={template.id}
            className={`template-card rounded shadow hover:shadow-md p-4 bg-white cursor-pointer ${
              template.status === 'APPROVED' ? 'border-2 border-green-500' :
              template.status === 'PENDING' ? 'border-2 border-yellow-400' :
              template.status === 'REJECTED' ? 'border-2 border-red-500' : ''
            }`}
            onClick={() => handleTemplateClick(template.id)}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{template.name}</h3>
                {template.status === 'APPROVED' && (
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-sm text-green-500">Active</span>
                  </div>
                )}
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesPage;
