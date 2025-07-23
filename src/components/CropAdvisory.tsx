import React from "react";

interface Crop {
  name: string;
  details: string;
}
interface Advice {
  crops: Crop[];
  tips: string;
}

const CropAdvisory: React.FC<{ advice: Advice | null }> = ({ advice }) => {
  if (!advice) return null;
  return (
    <div className="p-2 border rounded mb-2">
      <h3 className="font-bold mb-1">Crop Advisory</h3>
      {advice.crops.map(crop => (
        <div key={crop.name} className="mb-1">
          <strong>{crop.name}</strong>: {crop.details}
        </div>
      ))}
      <div className="text-sm text-gray-700 mt-2">{advice.tips}</div>
    </div>
  );
};

export default CropAdvisory; 