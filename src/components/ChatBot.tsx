import React, { useState, useEffect, useRef } from "react";
import LocationSelector from "./LocationSelector";
import { LanguageSelector } from "./LanguageSelector";
import WeatherDashboard from "./WeatherDashboard";
import CropAdvisory from "./CropAdvisory";
import VoiceControls from "./VoiceControls";
import AlertCards from "./AlertCards";
import { useTranslation } from "react-i18next";
import { mapCityToDistrict, fetchWeatherData, getCurrentSeason, getCropAdvice, WeatherData, CropAdvice } from "../lib/utils";

// Disease knowledge base (demo: rice, tomato, cotton)
const DISEASE_DB = [
  {
    crop: "rice",
    symptoms: ["yellow leaves", "stunted growth", "brown spots"],
    disease: {
      en: "Rice Blast",
      ta: "அரிசி வெடிப்பு நோய்",
      hi: "चावल ब्लास्ट",
      te: "బియ్యం బ్లాస్ట్"
    },
    advice: {
      en: "Remove infected plants, use recommended fungicides, avoid excess nitrogen, and ensure proper field drainage.",
      ta: "பாதிக்கப்பட்ட தாவரங்களை அகற்றவும், பரிந்துரைக்கப்பட்ட பூஞ்சைநாசினிகளை பயன்படுத்தவும், அதிக நைட்ரஜன் உரத்தை தவிர்க்கவும், வயல் வடிகால்களை பராமரிக்கவும்.",
      hi: "संक्रमित पौधों को हटाएं, अनुशंसित फफूंदनाशकों का उपयोग करें, अधिक नाइट्रोजन से बचें, और उचित जल निकासी सुनिश्चित करें।",
      te: "సంఖ్యిత మొక్కలను తొలగించండి, సూచించిన శిలీంధ్రనాశకాలను వాడండి, అధిక నత్రజని వాడకండి, మరియు సరైన కాలువ నిర్వహించండి."
    },
    eco: {
      en: "Try neem oil spray as an eco-friendly alternative.",
      ta: "சுற்றுச்சூழல் பாதுகாப்புக்காக வேப்பெண்ணை தெளிக்கவும்.",
      hi: "पर्यावरण के लिए नीम तेल का छिड़काव करें।",
      te: "పర్యావరణానికి నిమ్మ ఆయిల్ స్ప్రే వాడండి."
    }
  },
  {
    crop: "tomato",
    symptoms: ["leaf curl", "yellowing", "wilting"],
    disease: {
      en: "Tomato Leaf Curl Virus",
      ta: "தக்காளி இலை சுருட்டு வைரஸ்",
      hi: "टमाटर लीफ कर्ल वायरस",
      te: "టమోటా లీఫ్ కర్ల్ వైరస్"
    },
    advice: {
      en: "Remove affected plants, control whiteflies, and use virus-resistant varieties.",
      ta: "பாதிக்கப்பட்ட தாவரங்களை அகற்றவும், வெள்ளை ஈக்களை கட்டுப்படுத்தவும், வைரஸ் எதிர்ப்பு வகைகளை பயன்படுத்தவும்.",
      hi: "संक्रमित पौधों को हटाएं, सफेद मक्खियों को नियंत्रित करें, और वायरस-प्रतिरोधी किस्में लगाएं।",
      te: "ప్రమాదిత మొక్కలను తొలగించండి, తెల్ల దోమలను నియంత్రించండి, వైరస్ నిరోధక రకాలను వాడండి."
    },
    eco: {
      en: "Use yellow sticky traps and neem oil for eco-safe control.",
      ta: "மஞ்சள் ஒட்டும் கண்ணாடி மற்றும் வேப்பெண்ணை பயன்படுத்தவும்.",
      hi: "पीले चिपचिपे ट्रैप और नीम तेल का उपयोग करें।",
      te: "పసుపు స్టిక్కీ ట్రాప్‌లు, నిమ్మ ఆయిల్ వాడండి."
    }
  },
  {
    crop: "cotton",
    symptoms: ["boll rot", "black spots", "wilting"],
    disease: {
      en: "Cotton Boll Rot",
      ta: "பருத்தி பந்து அழுகல்",
      hi: "कपास बॉल रॉट",
      te: "పత్తి బోల్ రాట్"
    },
    advice: {
      en: "Remove infected bolls, avoid overhead irrigation, and use recommended fungicides.",
      ta: "பாதிக்கப்பட்ட பந்துகளை அகற்றவும், மேலிருந்து பாசனத்தை தவிர்க்கவும், பரிந்துரைக்கப்பட்ட பூஞ்சைநாசினிகளை பயன்படுத்தவும்.",
      hi: "संक्रमित बॉल्स को हटाएं, ऊपर से सिंचाई से बचें, और अनुशंसित फफूंदनाशकों का उपयोग करें।",
      te: "ప్రమాదిత బోల్‌లను తొలగించండి, పై నుండి నీటిపారుదల నివారించండి, సూచించిన శిలీంధ్రనాశకాలు వాడండి."
    },
    eco: {
      en: "Improve field air flow and use organic compost.",
      ta: "வயலில் காற்றோட்டத்தை மேம்படுத்தவும், காரிகாலம் உரங்களை இடவும்.",
      hi: "खेत में वायु प्रवाह बढ़ाएं और जैविक खाद का उपयोग करें।",
      te: "పొలంలో గాలి ప్రసరణ పెంచండి, సేంద్రీయ ఎరువులు వాడండి."
    }
  }
];

const EXPERT_LINK = "https://farmer.gov.in/ContactUs.aspx";

function detectDisease(query: string, crop: string) {
  const lowerQuery = query.toLowerCase();
  for (const entry of DISEASE_DB) {
    if (entry.crop === crop.toLowerCase()) {
      for (const symptom of entry.symptoms) {
        if (lowerQuery.includes(symptom)) {
          return entry;
        }
      }
    }
  }
  return null;
}

const FarmingAssistantPage = () => {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [season, setSeason] = useState<string>("");
  const [cropAdvice, setCropAdvice] = useState<CropAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      setDistrict(mapCityToDistrict(location));
    }
  }, [location]);

  useEffect(() => {
    if (district) {
      setLoading(true);
      fetchWeatherData(district)
        .then(data => setWeather(data))
        .catch(() => setError(t("weather.error")))
        .finally(() => setLoading(false));
    }
  }, [district, t]);

  useEffect(() => {
    if (district) {
      const currentSeason = getCurrentSeason(new Date(), district);
      setSeason(currentSeason);
      setCropAdvice(getCropAdvice(currentSeason, district, i18n.language));
    }
  }, [district, i18n.language]);

  return (
    <div className="relative w-full max-w-xl mx-auto p-2 sm:p-4 border rounded bg-white/80 shadow-lg overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-center">
      {/* Animated SVG background */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        style={{ opacity: 0.18, minWidth: '100%', minHeight: '100%' }}
      >
        {/* Soft gradient background */}
        <defs>
          <linearGradient id="chatbot-bg-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>
          <linearGradient id="chatbot-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b2ebf2" />
            <stop offset="100%" stopColor="#a5d6a7" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#chatbot-bg-gradient)" />
        {/* Animated wave */}
        <path>
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,320 Q100,340 200,320 T400,320 V400 H0Z;
                    M0,320 Q100,300 200,340 T400,320 V400 H0Z;
                    M0,320 Q100,340 200,320 T400,320 V400 H0Z" />
        </path>
        <path d="M0,320 Q100,340 200,320 T400,320 V400 H0Z" fill="url(#chatbot-wave)" />
        {/* Floating leaves */}
        <g>
          <ellipse cx="60" cy="60" rx="18" ry="7" fill="#a5d6a7">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="20 30" dur="7s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="340" cy="90" rx="14" ry="6" fill="#b2ebf2">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="-15 25" dur="6s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="120" cy="350" rx="10" ry="4" fill="#c8e6c9">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="10 -20" dur="9s" repeatCount="indefinite"/>
          </ellipse>
        </g>
      </svg>
      {/* Foreground content */}
      <div className="relative z-10 w-full flex flex-col gap-2 sm:gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LocationSelector value={location} onChange={setLocation} />
            <LanguageSelector />
            <VoiceControls language={i18n.language} />
          </div>
          <div className="flex-1">
            {loading && <div>{t("loading")}</div>}
            {error && <AlertCards type="error" message={error} />}
            {weather && <WeatherDashboard />}
            {season && <div>{t("season.current")}: {season}</div>}
            {cropAdvice && <CropAdvisory advice={cropAdvice} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingAssistantPage;
export const ChatBot = FarmingAssistantPage;