

// "use client"

// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// // Fetcher function for fetching template details
// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(`https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch template details');
//   }
//   return response.json();
// };

// const TemplateDetailsPage = () => {
//   const router = useRouter();
//   const { templateId } = useParams();
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (templateId) {
//       fetchTemplateDetails(templateId)
//         .then(data => setTemplateDetails(data))
//         .catch(error => setError('Error fetching template details: ' + error.message));
//     }
//   }, [templateId]);

//   if (error) return <div>{error}</div>;
//   if (!templateDetails) return <div>Loading template details...</div>;

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case 'HEADER':
//         if (component.format === 'TEXT') {
//           return (
//             <div className=" p-2 rounded-t-md">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (component.format === 'IMAGE' && component.example?.header_handle) {
//           const imageUrl = `https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed`;
//           return (
//             <div className=" p-2 rounded-t-md">
//               <img src={imageUrl} alt="Header Image" className="w-full h-auto rounded" />
//             </div>
//           );
//         }
//         break;
//       case 'BODY':
//         return (
//           <div className="p-2">
//             <p>{component.text}</p>
//           </div>
//         );
//       case 'FOOTER':
//         return (
//           <div className=" p-2 rounded-b-md text-sm text-gray-600">
//             {component.text}
//           </div>
//         );
//       case 'BUTTONS':
//         return (
//           <div className="flex space-x-2 p-2">
//             {component.buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className="bg-gray-300 text-black px-4 py-2 rounded-md"
//               >
//                 {button.text}
//               </button>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Template Details</h1>
//       <div
//         className="max-w-md mx-auto p-4 rounded-md shadow-md"
//         style={{
//           backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {templateDetails.components.map((component, index) => (
//           <div key={index} className="bg-white ">
//             {renderComponent(component)}
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => router.back()}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default TemplateDetailsPage;


// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(`https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch template details');
//   }
//   return response.json();
// };

// const TemplateDetailsPage = () => {
//   const router = useRouter();
//   const { templateId } = useParams();
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [parameters, setParameters] = useState({});

//   useEffect(() => {
//     if (templateId) {
//       fetchTemplateDetails(templateId)
//         .then(data => setTemplateDetails(data))
//         .catch(error => setError('Error fetching template details: ' + error.message));
//     }
//   }, [templateId]);

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case 'HEADER':
//         if (component.format === 'TEXT') {
//           return (
//             <div className="p-2 rounded-t-md">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (component.format === 'IMAGE' && component.example?.header_handle) {
//           const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed';
//           return (
//             <div className="p-2 rounded-t-md">
//               <img src={imageUrl} alt="Header Image" className="w-full h-auto rounded" />
//             </div>
//           );
//         }
//         break;
//       case 'BODY':
//         return (
//           <div className="p-2">
//             <p>{component.text}</p>
//           </div>
//         );
//       case 'FOOTER':
//         return (
//           <div className="p-2 rounded-b-md text-sm text-gray-600">
//             {component.text}
//           </div>
//         );
//       case 'BUTTONS':
//         return (
//           <div className="flex space-x-2 p-2">
//             {component.buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className="bg-gray-300 text-black px-4 py-2 rounded-md"
//               >
//                 {button.text}
//               </button>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleParameterChange = (index, type, value) => {
//     setParameters(prev => ({
//       ...prev,
//       [index]: { type, value }
//     }));
//   };

//   const handleSendMessage = async () => {
//     if (!phoneNumber || !templateDetails) return;
  
//     // Prepare body parameters
//     const bodyParameters = templateDetails.components
//       .find(component => component.type === 'BODY')
//       .example.body_text[0].map((text, index) => ({
//         type: 'text',
//         text: parameters[index]?.value || text
//       }));
  
//     // Check for header component
//     const headerComponent = templateDetails.components.find(component => component.type === 'HEADER');
//     const headerImageUrl = headerComponent?.format === 'IMAGE' ? 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed' : null;
  
//     // Prepare the payload
//     const payload = {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: phoneNumber,
//       type: "template",
//       template: {
//         name: templateDetails.name,
//         language: {
//           code: templateDetails.language || 'en_US'
//         },
//         components: [
//           headerImageUrl ? {
//             type: "header",
//             parameters: [
//               {
//                 type: "image",
//                 image: {
//                   link: headerImageUrl
//                 }
//               }
//             ]
//           } : null,
//           {
//             type: "body",
//             parameters: bodyParameters
//           }
//         ].filter(Boolean) // Remove null components
//       }
//     };
  
//     try {
//       const response = await fetch(`https://graph.facebook.com/v20.0/405411442646087/messages`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
  
//       const responseData = await response.json();
  
//       // Log the full response for debugging
//       console.log('Response Status:', response.status);
//       console.log('Response Data:', responseData);
  
//       if (!response.ok) {
//         throw new Error(`Failed to send message: ${responseData.error.message}`);
//       }
  
//       alert('Message sent successfully');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert(`Error sending message: ${error.message}`);
//     }
//   };
  
  
//   if (error) return <div>{error}</div>;
//   if (!templateDetails) return <div>Loading template details...</div>;

//   return (
//     <div className="container mx-auto p-4 flex space-x-4">
//       {/* Left Side - Received Template */}
//       <div
//         className="max-w-md bg-white p-4 rounded-md shadow-md flex-1"
//         style={{
//           backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {templateDetails.components.map((component, index) => (
//           <div key={index} className="bg-white">
//             {renderComponent(component)}
//           </div>
//         ))}
//       </div>

//       {/* Right Side - Send Message */}
//       <div className="flex-1 bg-gray-100 p-4 rounded-md shadow-md">
//         <h2 className="text-xl font-bold mb-4">Send Message</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter recipient's phone number"
//           />
//         </div>
//         {templateDetails.components
//           .find(component => component.type === 'BODY')
//           ?.example.body_text[0].map((example, index) => (
//             <div key={index} className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Parameter {index + 1}:</label>
//               <input
//                 type="text"
//                 value={parameters[index]?.value || ''}
//                 onChange={(e) => handleParameterChange(index, 'text', e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder={`Enter value for ${example}`}
//               />
//             </div>
//           ))}
//         <button
//           onClick={handleSendMessage}
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Send Message
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TemplateDetailsPage;

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const fetchTemplateDetails = async (id) => {
  const response = await fetch(`https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD`);
  if (!response.ok) {
    throw new Error('Failed to fetch template details');
  }
  return response.json();
};

const TemplateDetailsPage = () => {
  const router = useRouter();
  const { templateId } = useParams();
  const [templateDetails, setTemplateDetails] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [parameters, setParameters] = useState({});
  const [location, setLocation] = useState({
    latitude: '37.7749', // Random latitude for demo
    longitude: '-122.4194', // Random longitude for demo
    name: 'Random Place',
    address: '123 Random Street, San Francisco, CA'
  });

  useEffect(() => {
    if (templateId) {
      fetchTemplateDetails(templateId)
        .then(data => setTemplateDetails(data))
        .catch(error => setError('Error fetching template details: ' + error.message));
    }
  }, [templateId]);

  const renderComponent = (component) => {
    switch (component.type) {
      case 'HEADER':
        if (component.format === 'TEXT') {
          return (
            <div className="p-2 rounded-t-md bg-white">
              <strong>{component.text}</strong>
            </div>
          );
        } else if (component.format === 'IMAGE' && component.example?.header_handle?.[0]) {
            const imageUrl = component.example.header_handle[0];
            return (
              <div className="p-2 rounded-t-md bg-white">
                <img src={imageUrl} alt="Header Image" className="w-full h-auto rounded" />
              </div>
            );
        } else if (component.format === 'LOCATION') {
          return (
            <div className="p-2 rounded-t-md bg-white">
              <div>
                <strong>Location:</strong>
              </div>
              <div className="mt-2">
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                <p>Name: {location.name}</p>
                <p>Address: {location.address}</p>
              </div>
            </div>
          );
        }
        break;
      case 'BODY':
        return (
          <div className="p-2 bg-white">
            <p>{component.text}</p>
          </div>
        );
      case 'FOOTER':
        return (
          <div className="p-2 rounded-b-md text-sm text-gray-600 bg-white">
            {component.text}
          </div>
        );
      case 'BUTTONS':
        return (
          <div className="flex space-x-2 p-2">
            {component.buttons.map((button, index) => (
              <button
                key={index}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                {button.text}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleParameterChange = (index, type, value) => {
    setParameters(prev => ({
      ...prev,
      [index]: { type, value }
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendMessage = async () => {
    if (!phoneNumber || !templateDetails) return;

    // Prepare body parameters
    const bodyComponent = templateDetails.components
      .find(component => component.type === 'BODY');

    const bodyParameters = bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
      type: 'text',
      text: parameters[index]?.value || text
    })) || [];

    // Check for header component
    const headerComponent = templateDetails.components.find(component => component.type === 'HEADER');
    const headerImageUrl = headerComponent?.format === 'IMAGE' ? 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed' : null;

    // Prepare the payload
    const components = [
      headerImageUrl ? {
        type: "header",
        parameters: [
          {
            type: "image",
            image: {
              link: headerImageUrl
            }
          }
        ]
      } : null,
      {
        type: "body",
        parameters: bodyParameters
      }
    ].filter(Boolean); // Remove null components

    // Add location component if format is LOCATION
    const locationComponent = templateDetails.components
      .find(component => component.type === 'HEADER' && component.format === 'LOCATION');

    if (locationComponent) {
      components.push({
        type: "header",
        parameters: [
          {
            type: "location",
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
              name: location.name,
              address: location.address
            }
          }
        ]
      });
    }

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "template",
      template: {
        name: templateDetails.name,
        language: {
          code: templateDetails.language || 'en_US'
        },
        components
      }
    };

    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/405411442646087/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      // Log the full response for debugging
      console.log('Response Status:', response.status);
      console.log('Response Data:', responseData);

      if (!response.ok) {
        throw new Error(`Failed to send message: ${responseData.error.message}`);
      }

      alert('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      alert(`Error sending message: ${error.message}`);
    }
  };

  if (error) return <div>{error}</div>;
  if (!templateDetails) return <div>Loading template details...</div>;

  return (
    <div className="container mx-auto p-4 flex space-x-4">
      {/* Left Side - Received Template */}
      <div
        className="max-w-md bg-white p-4 rounded-md shadow-md flex-1"
        style={{
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {templateDetails.components.map((component, index) => (
          <div key={index}>
            {renderComponent(component)}
          </div>
        ))}
      </div>
      {/* Right Side - Send Message Form */}
      <div className="max-w-md bg-white p-4 rounded-md shadow-md flex-1">
        <h2 className="text-xl font-semibold mb-4">Send Message</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        {templateDetails.components.map((component, index) => {
          if (component.type === 'BODY' && component.example?.body_text?.[0]) {
            return component.example.body_text[0].map((text, i) => (
              <div key={i} className="mb-4">
                <label className="block text-gray-700">Parameter {i + 1}:</label>
                <input
                  type="text"
                  value={parameters[i]?.value || text}
                  onChange={(e) => handleParameterChange(i, component.example.body_text[0][i], e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            ));
          }
          return null;
        })}
        {templateDetails.components.some(component => component.type === 'HEADER' && component.format === 'LOCATION') && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Location Details</h3>
            <div className="mb-2">
              <label className="block text-gray-700">Latitude:</label>
              <input
                type="text"
                value={location.latitude}
                onChange={(e) => handleLocationChange('latitude', e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Longitude:</label>
              <input
                type="text"
                value={location.longitude}
                onChange={(e) => handleLocationChange('longitude', e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={location.name}
                onChange={(e) => handleLocationChange('name', e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => handleLocationChange('address', e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
        )}
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default TemplateDetailsPage;
