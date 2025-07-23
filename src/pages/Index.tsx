import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ChatBot } from "@/components/ChatBot";
import WeatherDashboard from "@/components/WeatherDashboard";
import MarketInsights from "@/components/MarketInsights";
import { PlantIdentification } from "@/components/PlantIdentification";
import SoilCropAdvice from "@/components/SoilCropAdvice";
import PestDiseaseDetection from "@/components/PestDiseaseDetection";
import { useTranslation } from "react-i18next";
import { fetchWeatherData, mapCityToDistrict, getCurrentSeason } from "../lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useTranslation();
  const [autoWeather, setAutoWeather] = useState<any>(null);
  const [autoLocation, setAutoLocation] = useState<string>("");
  const [autoSeason, setAutoSeason] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  // Auto-fetch weather, location, and season on load
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        // Try to get cached data first
        const cachedWeather = localStorage.getItem("weather");
        const cachedLocation = localStorage.getItem("location");
        const cachedSeason = localStorage.getItem("season");
        if (cachedWeather && cachedLocation && cachedSeason) {
          setAutoWeather(JSON.parse(cachedWeather));
          setAutoLocation(cachedLocation);
          setAutoSeason(cachedSeason);
          setLoading(false);
          return;
        }
        // Get location
        let loc = "";
        if (navigator.geolocation) {
          await new Promise<void>((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                loc = `${pos.coords.latitude},${pos.coords.longitude}`;
                setAutoLocation(loc);
                localStorage.setItem("location", loc);
                resolve();
              },
              () => {
                loc = "Chennai";
                setAutoLocation(loc);
                localStorage.setItem("location", loc);
                resolve();
              }
            );
          });
        } else {
          loc = "Chennai";
          setAutoLocation(loc);
          localStorage.setItem("location", loc);
        }
        // Fetch weather
        const weather = await fetchWeatherData(loc);
        setAutoWeather(weather);
        localStorage.setItem("weather", JSON.stringify(weather));
        // Get season
        const district = mapCityToDistrict(loc);
        const season = getCurrentSeason(new Date(), district);
        setAutoSeason(season);
        localStorage.setItem("season", season);
        setLoading(false);
      } catch (e) {
        setOffline(true);
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HeroSection />;
      case "chat":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("ai_farm_assistant")}</h2>
              <p className="text-muted-foreground">{t("get_instant_answers")}</p>
            </div>
            <ChatBot />
          </div>
        );
      case "weather":
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WeatherDashboard />
          </div>
        );
      case "market":
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MarketInsights />
          </div>
        );
      case "identify":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PlantIdentification />
          </div>
        );
      case "soil":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SoilCropAdvice />
          </div>
        );
      case "pest":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PestDiseaseDetection />
          </div>
        );
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle font-sans transition-all duration-500">
      {/* Animated background graphics */}
      <div className="fixed inset-0 -z-10">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0f7fa" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#bg-grad)" />
          <ellipse cx="200" cy="200" rx="120" ry="40" fill="#b2ebf2" opacity="0.18">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="40 60" dur="8s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="1240" cy="700" rx="100" ry="30" fill="#a5d6a7" opacity="0.15">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="-30 -40" dur="10s" repeatCount="indefinite"/>
          </ellipse>
        </svg>
      </div>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={`w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ${activeTab === "home" ? "" : "pt-16 md:pt-20"} ${activeTab !== "home" ? "pb-20 md:pb-8" : ""} transition-all duration-500`}
        style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <span className="text-lg text-muted-foreground">{t("Loading data...")}</span>
            {offline && <span className="text-red-500 mt-2">{t("Offline or low-data mode. Showing cached info if available.")}</span>}
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
};

export default Index;
