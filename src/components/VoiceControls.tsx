import React, { useState } from "react";

interface VoiceControlsProps {
  language: string;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ language }) => {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  return (
    <div className="flex gap-2 my-2">
      <button
        onClick={() => setListening(l => !l)}
        aria-label={listening ? "Stop Listening" : "Start Listening"}
        className={`px-2 py-1 border rounded ${listening ? "bg-green-200" : ""}`}
      >
        {listening ? "🛑" : "🎤"}
      </button>
      <button
        onClick={() => setSpeaking(s => !s)}
        aria-label={speaking ? "Stop Speaking" : "Start Speaking"}
        className={`px-2 py-1 border rounded ${speaking ? "bg-blue-200" : ""}`}
      >
        {speaking ? "🔇" : "🔊"}
      </button>
    </div>
  );
};

export default VoiceControls; 