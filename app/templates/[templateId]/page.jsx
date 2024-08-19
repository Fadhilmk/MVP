
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { storage } from "../../../firebase"; // Adjust the path to your firebaseConfig.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fetchTemplateDetails = async (id) => {
  const response = await fetch(
    `https://graph.facebook.com/v20.0/${id}?access_token=EAAYbZBkW0wTYBO2VPHASf93eAYeTPotpxx97wHd7RILJZCSrupW8p9CgV0reFd0UgPo0QGqE8a4yiqlW1Snf1pL0CU9Ef1fiQFFYwbZC8Pl2E5JkZCetXVlCO2hg8Ido7j4yiZBBgsodsdZBvcRXuTNWGhv3WXBATehzhKo92R9PDOYu1vCZB5TG8sbHKI5ZB2lBPFSfqi86FJqtqBZAmqPuOaqanXyorg0galMb5tRugX8EZD`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch template details");
  }
  return response.json();
};

const TemplateDetailsPage = () => {
  const router = useRouter();
  const { templateId } = useParams();
  const [templateDetails, setTemplateDetails] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [headerParameters, setHeaderParameters] = useState({});
  const [bodyParameters, setBodyParameters] = useState({});
  const [location, setLocation] = useState({
    latitude: "37.7749", // Random latitude for demo
    longitude: "-122.4194", // Random longitude for demo
    name: "Random Place",
    address: "123 Random Street, San Francisco, CA",
  });
  const [document, setDocument] = useState(null);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (templateId) {
      fetchTemplateDetails(templateId)
        .then((data) => setTemplateDetails(data))
        .catch((error) =>
          setError("Error fetching template details: " + error.message)
        );
    }
  }, [templateId]);

  const renderComponent = (component) => {
    switch (component.type) {
      case "HEADER":
        if (component.format === "TEXT") {
          return (
            <div className="p-2 bg-white ">
              <strong>{component.text}</strong>
            </div>
          );
        } else if (
          component.format === "IMAGE" &&
          component.example?.header_handle?.[0]
        ) {
          const imageUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white ">
              <img
                src={imageUrl}
                alt="Header Image"
                className="w-full h-auto rounded"
              />
            </div>
          );
        } else if (
          component.format === "VIDEO" &&
          component.example?.header_handle?.[0]
        ) {
          const videoUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white ">
              <video controls className="w-full h-auto rounded">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (component.format === "LOCATION") {
          return (
            <div className="p-2 bg-white ">
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
        } else if (
          component.format === "DOCUMENT" &&
          component.example?.header_handle?.[0]
        ) {
          const documentUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white ">
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          );
        }
        break;
      case "BODY":
        return (
          <div className="p-2 bg-white  ">
            <p>{component.text}</p>
          </div>
        );
      case "FOOTER":
        return (
          <div className="p-2 bg-white  text-sm text-gray-600">
            {component.text}
          </div>
        );
      case "BUTTONS":
        return (
          <div className="flex flex-wrap space-x-2 p-2 bg-white ">
            {component.buttons.map((button, index) => (
              <button
                key={index}
                className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md mb-2"
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

  const handleHeaderParameterChange = (index, value) => {
    setHeaderParameters((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBodyParameterChange = (index, value) => {
    setBodyParameters((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };
  const handleUpload = async (file, fileType) => {
    if (!file) return "";

    const fileRef = ref(storage, `${fileType}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleSendMessage = async () => {
    if (!phoneNumber || !templateDetails) return;

    const documentUrl = document
      ? await handleUpload(document, "documents")
      : "";
    const videoUrl = video ? await handleUpload(video, "videos") : "";
    const imageUrl = image ? await handleUpload(image, "images") : "";

    // Prepare header parameters
    const headerComponent = templateDetails.components.find(
      (component) => component.type === "HEADER"
    );

    let headerParametersFormatted = [];

    if (
      headerComponent?.format === "TEXT" &&
      headerComponent.example?.header_text
    ) {
      headerParametersFormatted = [
        {
          type: "text",
          text: headerParameters[0] || headerComponent.example.header_text[0],
        },
      ];
    } else if (headerComponent?.format === "IMAGE") {
      headerParametersFormatted = [
        {
          type: "image",
          image: {
            link: imageUrl, // Replace with your image URL
          },
        },
      ];
    } else if (headerComponent?.format === "VIDEO") {
      headerParametersFormatted = [
        {
          type: "video",
          video: {
            link: videoUrl, // Replace with your actual video URL
          },
        },
      ];
    }

    // Check if the number of header parameters matches the expected count
    if (
      headerComponent?.format === "TEXT" &&
      headerComponent.text.includes("{{") &&
      headerParametersFormatted.length === 0
    ) {
      alert("Please provide the required header parameter.");
      return;
    }

    // Prepare body parameters
    const bodyComponent = templateDetails.components.find(
      (component) => component.type === "BODY"
    );

    const bodyParametersFormatted =
      bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
        type: "text",
        text: bodyParameters[index] || text,
      })) || [];

    // Construct the payload with the correct number of parameters
    const components = [
      headerParametersFormatted.length > 0 && {
        type: "header",
        parameters: headerParametersFormatted,
      },
      {
        type: "body",
        parameters: bodyParametersFormatted,
      },
    ].filter(Boolean); // Remove empty/null components

    // Add location component if format is LOCATION
    const locationComponent = templateDetails.components.find(
      (component) =>
        component.type === "HEADER" && component.format === "LOCATION"
    );

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
              address: location.address,
            },
          },
        ],
      });
    }

    // Add document component if format is DOCUMENT
    const documentComponent = templateDetails.components.find(
      (component) =>
        component.type === "HEADER" && component.format === "DOCUMENT"
    );

    if (documentComponent && document) {
      components.push({
        type: "header",
        parameters: [
          {
            type: "document",
            document: {
              link: documentUrl,
              filename: "Product",
            },
          },
        ],
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
          code: templateDetails.language || "en_US",
        },
        components,
      },
    };

    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/405411442646087/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer EAAYbZBkW0wTYBO2VPHASf93eAYeTPotpxx97wHd7RILJZCSrupW8p9CgV0reFd0UgPo0QGqE8a4yiqlW1Snf1pL0CU9Ef1fiQFFYwbZC8Pl2E5JkZCetXVlCO2hg8Ido7j4yiZBBgsodsdZBvcRXuTNWGhv3WXBATehzhKo92R9PDOYu1vCZB5TG8sbHKI5ZB2lBPFSfqi86FJqtqBZAmqPuOaqanXyorg0galMb5tRugX8EZD`, // Replace with your actual access token
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Failed to send message:", responseData);
      } else {
        alert("Message sent successfully");
      }
    } catch (error) {
      alert("Error sending message:", error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!templateDetails) {
    return <p>Loading template details...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 p-6 space-y-6 lg:space-y-0">
      {/* Template Details Section */}
      <div
        className="lg:w-1/5 bg-white p-4 rounded-lg shadow-md"
        style={{
          backgroundImage:
            'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Template Details</h2>
        <div
          className="p-1"
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {templateDetails.components.map((component, index) => (
            <div key={index}>{renderComponent(component)}</div>
          ))}
        </div>
      </div>

      {/* Sent Message Details and Input Fields */}
      <div className="lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Send Message With This Template
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 rounded border text-black"
          />
        </div>

        {/* Render input fields for HEADER parameters if applicable */}
        {templateDetails?.components.map((component, index) =>
          component.type === "HEADER" ? (
            component.format === "TEXT" ? (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">
                  Header Parameter
                </label>
                {Array.isArray(component.example?.header_text) ? (
                  component.example.header_text.map((text, paramIndex) => (
                    <input
                      key={paramIndex}
                      type="text"
                      value={headerParameters[paramIndex] || ""}
                      onChange={(e) =>
                        handleHeaderParameterChange(paramIndex, e.target.value)
                      }
                      className="w-full p-2 rounded border text-black"
                    />
                  ))
                ) : (
                  <input
                    type="text"
                    value={
                      headerParameters[0] ||
                      component.example?.header_text ||
                      ""
                    }
                    onChange={(e) =>
                      handleHeaderParameterChange(0, e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                )}
              </div>
            ) : component.format === "IMAGE" ? (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded border"
                />
              </div>
            ) : component.format === "VIDEO" ? (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full p-2 rounded border"
                />
              </div>
            ) : null
          ) : null
        )}

        {/* Render input fields for BODY parameters */}
        {templateDetails.components.map(
          (component, index) =>
            component.type === "BODY" &&
            component.example?.body_text?.[0]?.map((text, paramIndex) => (
              <div key={paramIndex} className="mb-4">
                <label className="block font-medium mb-1">
                  Parameter {paramIndex + 1}
                </label>
                <input
                  type="text"
                  value={bodyParameters[paramIndex] || ""}
                  onChange={(e) =>
                    handleBodyParameterChange(paramIndex, e.target.value)
                  }
                  className="w-full p-2 rounded border text-black"
                />
              </div>
            ))
        )}

        {/* Render input fields for LOCATION header if applicable */}
        {templateDetails.components.map(
          (component, index) =>
            component.type === "HEADER" &&
            component.format === "LOCATION" && (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Latitude</label>
                <input
                  type="text"
                  value={location.latitude}
                  onChange={(e) =>
                    handleLocationChange("latitude", e.target.value)
                  }
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Longitude</label>
                <input
                  type="text"
                  value={location.longitude}
                  onChange={(e) =>
                    handleLocationChange("longitude", e.target.value)
                  }
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Name</label>
                <input
                  type="text"
                  value={location.name}
                  onChange={(e) => handleLocationChange("name", e.target.value)}
                  className="w-full p-2 rounded border text-black"
                />
                <label className="block font-medium mb-1 mt-2">Address</label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) =>
                    handleLocationChange("address", e.target.value)
                  }
                  className="w-full p-2 rounded border text-black"
                />
              </div>
            )
        )}

        {/* Render input fields for DOCUMENT header if applicable */}
        {templateDetails.components.map(
          (component, index) =>
            component.type === "HEADER" &&
            component.format === "DOCUMENT" && (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">
                  Upload Document
                </label>
                <input
                  type="file"
                  onChange={handleDocumentChange}
                  className="w-full p-2 rounded border"
                />
              </div>
            )
        )}

        <button
          onClick={handleSendMessage}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default TemplateDetailsPage;
