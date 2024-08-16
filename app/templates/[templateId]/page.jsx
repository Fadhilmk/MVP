
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
//   const [location, setLocation] = useState({
//     latitude: '37.7749', // Random latitude for demo
//     longitude: '-122.4194', // Random longitude for demo
//     name: 'Random Place',
//     address: '123 Random Street, San Francisco, CA'
//   });

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
//             <div className="p-2 rounded-t-md bg-white">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (component.format === 'IMAGE' && component.example?.header_handle?.[0]) {
//             const imageUrl = component.example.header_handle[0];
//             return (
//               <div className="p-2 rounded-t-md bg-white">
//                 <img src={imageUrl} alt="Header Image" className="w-full h-auto rounded" />
//               </div>
//             );
//         } else if (component.format === 'LOCATION') {
//           return (
//             <div className="p-2 rounded-t-md bg-white">
//               <div>
//                 <strong>Location:</strong>
//               </div>
//               <div className="mt-2">
//                 <p>Latitude: {location.latitude}</p>
//                 <p>Longitude: {location.longitude}</p>
//                 <p>Name: {location.name}</p>
//                 <p>Address: {location.address}</p>
//               </div>
//             </div>
//           );
//         } else if (component.format === 'DOCUMENT' && component.example?.header_handle?.[0]) {
//           const documentUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 rounded-t-md bg-white">
//               <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                 View Document
//               </a>
//             </div>
//           );
//         }
//         break;
//       case 'BODY':
//         return (
//           <div className="p-2 bg-white">
//             <p>{component.text}</p>
//           </div>
//         );
//       case 'FOOTER':
//         return (
//           <div className="p-2 rounded-b-md text-sm text-gray-600 bg-white">
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

//   const handleLocationChange = (field, value) => {
//     setLocation(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSendMessage = async () => {
//     if (!phoneNumber || !templateDetails) return;

//     // Prepare body parameters
//     const bodyComponent = templateDetails.components
//       .find(component => component.type === 'BODY');

//     const bodyParameters = bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
//       type: 'text',
//       text: parameters[index]?.value || text
//     })) || [];

//     // Check for header component
//     const headerComponent = templateDetails.components.find(component => component.type === 'HEADER');
//     const headerImageUrl = headerComponent?.format === 'IMAGE' ? 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed' : null;

//     // Prepare the payload
//     const components = [
//       headerImageUrl ? {
//         type: "header",
//         parameters: [
//           {
//             type: "image",
//             image: {
//               link: headerImageUrl
//             }
//           }
//         ]
//       } : null,
//       {
//         type: "body",
//         parameters: bodyParameters
//       }
//     ].filter(Boolean); // Remove null components

//     // Add location component if format is LOCATION
//     const locationComponent = templateDetails.components
//       .find(component => component.type === 'HEADER' && component.format === 'LOCATION');

//     if (locationComponent) {
//       components.push({
//         type: "header",
//         parameters: [
//           {
//             type: "location",
//             location: {
//               latitude: location.latitude,
//               longitude: location.longitude,
//               name: location.name,
//               address: location.address
//             }
//           }
//         ]
//       });
//     }

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
//         components
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
//           backgroundPosition: 'center'
//         }}
//       >
//         {templateDetails.components.map((component, index) => (
//           <div key={index}>
//             {renderComponent(component)}
//           </div>
//         ))}
//       </div>
//       {/* Right Side - Send Message Form */}
//       <div className="max-w-md bg-white p-4 rounded-md shadow-md flex-1">
//         <h2 className="text-xl font-semibold mb-4">Send Message</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone Number:</label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//           />
//         </div>
//         {templateDetails.components.map((component, index) => {
//           if (component.type === 'BODY' && component.example?.body_text?.[0]) {
//             return component.example.body_text[0].map((text, i) => (
//               <div key={i} className="mb-4">
//                 <label className="block text-gray-700">Parameter {i + 1}:</label>
//                 <input
//                   type="text"
//                   value={parameters[i]?.value || text}
//                   onChange={(e) => handleParameterChange(i, component.example.body_text[0][i], e.target.value)}
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>
//             ));
//           }
//           return null;
//         })}
//         {templateDetails.components.some(component => component.type === 'HEADER' && component.format === 'LOCATION') && (
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">Location Details</h3>
//             <div className="mb-2">
//               <label className="block text-gray-700">Latitude:</label>
//               <input
//                 type="text"
//                 value={location.latitude}
//                 onChange={(e) => handleLocationChange('latitude', e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-gray-700">Longitude:</label>
//               <input
//                 type="text"
//                 value={location.longitude}
//                 onChange={(e) => handleLocationChange('longitude', e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-gray-700">Name:</label>
//               <input
//                 type="text"
//                 value={location.name}
//                 onChange={(e) => handleLocationChange('name', e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-gray-700">Address:</label>
//               <input
//                 type="text"
//                 value={location.address}
//                 onChange={(e) => handleLocationChange('address', e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//           </div>
//         )}
//         <button
//           onClick={handleSendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
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
  const response = await fetch(`https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBOw8Wpr8M36iTAlC8rm5ry0wzZBJVdBTG1LJiaNxZAwfiZBL5aRCAosi0m49W2Nwev8ufAKqaK8aiwcZBcCoZCKUCKZCViQUggopnnTb65MxVA49RfKjhcWDiAs3hPRKbXug9nqnVuf4yKgg2ZA4ldyYbL7Mo74ZCY7amAOaoWT6NRmLVZCLKyZBggVoPJtKGjgE2oqZCYZBELMutVLYyqIerdEYboerLZBO7MWFUZD`);
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
  const [document, setDocument] = useState(null);

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
            <div className="p-2 bg-white rounded-t-md">
              <strong>{component.text}</strong>
            </div>
          );
        } else if (component.format === 'IMAGE' && component.example?.header_handle?.[0]) {
          const imageUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white rounded-t-md">
              <img src={imageUrl} alt="Header Image" className="w-full h-auto rounded" />
            </div>
          );
        } else if (component.format === 'LOCATION') {
          return (
            <div className="p-2 bg-white rounded-t-md">
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
        } else if (component.format === 'DOCUMENT' && component.example?.header_handle?.[0]) {
          const documentUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white rounded-t-md">
              <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Document
              </a>
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
          <div className="p-2 bg-white rounded-b-md text-sm text-gray-600">
            {component.text}
          </div>
        );
      case 'BUTTONS':
        return (
          <div className="flex space-x-2 p-2 bg-white">
            {component.buttons.map((button, index) => (
              <button
                key={index}
                className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md"
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

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
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

    // Add document component if format is DOCUMENT
    const documentComponent = templateDetails.components
      .find(component => component.type === 'HEADER' && component.format === 'DOCUMENT');

    if (documentComponent && document) {
      components.push({
        type: "header",
        parameters: [
          {
            type: "document",
            document: {
              link: "https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/pdf%2FDXL.pdf?alt=media&token=54040bd3-eb1d-4615-9af5-9a441fd04447",
              filename: "Product"
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
          'Authorization': `Bearer EAAYbZBkW0wTYBOw8Wpr8M36iTAlC8rm5ry0wzZBJVdBTG1LJiaNxZAwfiZBL5aRCAosi0m49W2Nwev8ufAKqaK8aiwcZBcCoZCKUCKZCViQUggopnnTb65MxVA49RfKjhcWDiAs3hPRKbXug9nqnVuf4yKgg2ZA4ldyYbL7Mo74ZCY7amAOaoWT6NRmLVZCLKyZBggVoPJtKGjgE2oqZCYZBELMutVLYyqIerdEYboerLZBO7MWFUZD`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      // Log the full response for debugging
      console.log('Response Status:', response.status);
      console.log('Response Data:', responseData);

      if (!response.ok) {
        console.error('Failed to send message:', responseData);
      } else {
        alert('Message sent successfully');
      }

    } catch (error) {
      alert('Error sending message:', error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!templateDetails) {
    return <p>Loading template details...</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      {/* Received Message Bubble */}
      <div className="w-full max-w-md">
        <div className="bg-white text-black p-4 rounded-lg shadow-md" style={{
           backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
           backgroundSize: 'cover',
          backgroundPosition: 'center'
         }}>
          {templateDetails.components.map((component, index) => (
            <div key={index} className="">
              {renderComponent(component)}
            </div>
          ))}
        </div>
      </div>

      {/* Sent Message Details and Input Fields */}
      <div className="w-full max-w-md flex flex-col items-end">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-full">
          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 rounded border text-black"
            />
          </div>

          {/* Render input fields for BODY parameters */}
          {templateDetails.components.map((component, index) => (
            component.type === 'BODY' && component.example?.body_text?.[0]?.map((text, paramIndex) => (
              <div key={paramIndex} className="mb-4">
                <label className="block font-medium mb-1">Parameter {paramIndex + 1}</label>
                <input
                  type="text"
                  value={parameters[paramIndex]?.value || ''}
                  onChange={(e) => handleParameterChange(paramIndex, 'text', e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
              </div>
            ))
          ))}

          {/* Render input fields for LOCATION header if applicable */}
          {templateDetails.components.map((component, index) => (
            component.type === 'HEADER' && component.format === 'LOCATION' && (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Latitude</label>
                <input
                  type="text"
                  value={location.latitude}
                  onChange={(e) => handleLocationChange('latitude', e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Longitude</label>
                <input
                  type="text"
                  value={location.longitude}
                  onChange={(e) => handleLocationChange('longitude', e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Name</label>
                <input
                  type="text"
                  value={location.name}
                  onChange={(e) => handleLocationChange('name', e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Address</label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
              </div>
            )
          ))}

          {/* Render input fields for DOCUMENT header if applicable */}
          {templateDetails.components.map((component, index) => (
            component.type === 'HEADER' && component.format === 'DOCUMENT' && (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Upload Document</label>
                <input
                  type="file"
                  onChange={handleDocumentChange}
                  className="w-full p-2 rounded border"
                />
              </div>
            )
          ))}

          <button
            onClick={handleSendMessage}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsPage;
