import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelector({ onDualLanguageChange }: { onDualLanguageChange?: (enabled: boolean) => void }) {
  const { i18n } = useTranslation();
  const [dualLanguage, setDualLanguage] = useState(false);
  const languages = [
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
    { code: "hi", label: "हिन्दी" },
    { code: "te", label: "తెలుగు" },
    { code: "ml", label: "മലയാളം" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "mr", label: "मराठी" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "bn", label: "বাংলা" },
    { code: "ur", label: "اردو" },
    { code: "as", label: "অসমীয়া" },
    { code: "or", label: "ଓଡ଼ିଆ" },
  ];

  const handleDualLanguageToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDualLanguage(e.target.checked);
    if (onDualLanguageChange) onDualLanguageChange(e.target.checked);
  };

  return (
    <div className="mb-2 flex flex-col gap-2">
      <label className="block mb-1 font-semibold">Language:</label>
      <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)} className="border rounded p-1">
        {languages.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
      <label className="flex items-center gap-2 mt-1 text-sm">
        <input type="checkbox" checked={dualLanguage} onChange={handleDualLanguageToggle} />
        Show Tamil + English
      </label>
    </div>
  );
} 