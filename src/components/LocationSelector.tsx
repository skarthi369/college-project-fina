import React, { useState } from "react";

const cities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Tirunelveli",
  "Vellore",
  "Erode",
  "Kanchipuram",
  "Thanjavur"
];

interface LocationSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

const cityToDistrictMap: Record<string, string> = {
  Chennai: "Kanchipuram District",
  Coimbatore: "Coimbatore District",
  Madurai: "Madurai District",
  Salem: "Salem District",
  Tiruchirappalli: "Tiruchirappalli District",
  Tirunelveli: "Tirunelveli District",
  Vellore: "Vellore District",
  Erode: "Erode District",
  Kanchipuram: "Kanchipuram District",
  Thanjavur: "Thanjavur District"
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange }) => {
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [district, setDistrict] = useState("");

  const handleAutoDetect = () => {
    setAutoDetecting(true);
    if (!navigator.geolocation) {
      setAutoDetecting(false);
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Fallback example, replace with real reverse geocoding for production
        const autoCity = "Chennai";
        onChange(autoCity);
        setDistrict(cityToDistrictMap[autoCity]);
        setAutoDetecting(false);
      },
      () => {
        setAutoDetecting(false);
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleChange = (selected: string) => {
    onChange(selected);
    setDistrict(cityToDistrictMap[selected]);
  };

  return (
    <div className="mb-4 p-3 border rounded shadow-sm bg-white">
      <label className="block mb-2 font-semibold text-gray-700">📍 Select Your Location:</label>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        <select
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="border rounded p-2 text-gray-700"
        >
          <option value="">-- Choose a city --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={handleAutoDetect}
          disabled={autoDetecting}
          className={`px-3 py-2 border rounded ${autoDetecting ? "bg-yellow-200" : "bg-green-100 hover:bg-green-200"}`}
        >
          {autoDetecting ? "Detecting..." : "Auto Detect"}
        </button>
      </div>
      {district && (
        <p className="mt-2 text-sm text-green-700 font-medium">
          🗺️ Agricultural District: <strong>{district}</strong>
        </p>
      )}
    </div>
  );
};

export default LocationSelector;