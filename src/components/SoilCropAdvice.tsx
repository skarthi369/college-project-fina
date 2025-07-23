import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const DISTRICTS = [
  { code: "chennai", en: "Chennai", ta: "சென்னை" },
  { code: "coimbatore", en: "Coimbatore", ta: "கோயம்புத்தூர்" },
  { code: "madurai", en: "Madurai", ta: "மதுரை" },
];
const SEASONS = [
  { code: "kuruvai", en: "Kuruvai", ta: "குருவை" },
  { code: "thaladi", en: "Thaladi", ta: "தளடி" },
  { code: "samba", en: "Samba", ta: "சாம்பா" },
];
const CROP_ADVICE = {
  chennai: {
    kuruvai: {
      crops: [
        { en: "Rice (Kuruvai)", ta: "அரிசி (குருவை)" },
        { en: "Blackgram", ta: "உளுந்து" },
      ],
      advice: {
        en: "Ensure timely irrigation and use short-duration rice varieties.",
        ta: "நேர்மையான பாசனத்தை உறுதி செய்யவும், குறுகிய கால அரிசி வகைகளை பயன்படுத்தவும்.",
      },
    },
    thaladi: {
      crops: [
        { en: "Rice (Thaladi)", ta: "அரிசி (தளடி)" },
        { en: "Green gram", ta: "பயத்தம்" },
      ],
      advice: {
        en: "Monitor for pest outbreaks and maintain field drainage.",
        ta: "பூச்சி தாக்குதலை கவனிக்கவும், வயல் வடிகால்களை பராமரிக்கவும்.",
      },
    },
    samba: {
      crops: [
        { en: "Rice (Samba)", ta: "அரிசி (சாம்பா)" },
        { en: "Groundnut", ta: "நிலக்கடலை" },
      ],
      advice: {
        en: "Apply organic manure and follow recommended sowing dates.",
        ta: "கரிகாலம் உரங்களை இடவும், பரிந்துரைக்கப்பட்ட விதைப்பு தேதிகளை பின்பற்றவும்.",
      },
    },
  },
  // ... add for other districts
};

export default function SoilCropAdvice() {
  const { t, i18n } = useTranslation();
  const [district, setDistrict] = useState("chennai");
  const [season, setSeason] = useState("kuruvai");
  const [showBothLangs, setShowBothLangs] = useState(false);

  const cropData = CROP_ADVICE[district]?.[season];

  // TTS for advice
  const speak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center mb-4">
        <label>{t("District")}: </label>
        <select value={district} onChange={e => setDistrict(e.target.value)} className="border rounded px-2 py-1">
          {DISTRICTS.map(d => (
            <option key={d.code} value={d.code}>{d.en} / {d.ta}</option>
          ))}
        </select>
        <label>{t("Season")}: </label>
        <select value={season} onChange={e => setSeason(e.target.value)} className="border rounded px-2 py-1">
          {SEASONS.map(s => (
            <option key={s.code} value={s.code}>{s.en} / {s.ta}</option>
          ))}
        </select>
        <label className="ml-4 flex items-center gap-1">
          <input type="checkbox" checked={showBothLangs} onChange={e => setShowBothLangs(e.target.checked)} />
          {t("Show both languages")}
        </label>
      </div>
      {cropData && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">{t("Recommended Crops")}</h3>
            <ul className="list-disc ml-6">
              {cropData.crops.map((c, idx) => (
                <li key={idx}>
                  {showBothLangs ? `${c.en} / ${c.ta}` : (i18n.language === "ta" ? c.ta : c.en)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{t("Farming Advice")}</h3>
            <p>
              {showBothLangs
                ? `${cropData.advice.en}\n${cropData.advice.ta}`
                : (i18n.language === "ta" ? cropData.advice.ta : cropData.advice.en)}
            </p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => speak(cropData.advice.en, "en-US")}>🔊 English</Button>
              <Button onClick={() => speak(cropData.advice.ta, "ta-IN")}>🔊 தமிழ்</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 