import Lottie from "lottie-react";
import farmCorn from "@/assets/Farm corn.json";
import agricultureBg from "@/assets/farm-animation.json";
import iotDigitalFarm from "@/assets/IoT digital farming with drone.json";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 overflow-hidden">
      {/* Animated SVGs for extra flair */}
      <svg className="absolute top-10 left-10 w-32 h-16 animate-cloud float-cloud opacity-70 z-0" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="20" rx="30" ry="15" fill="#e0f7fa" />
        <ellipse cx="60" cy="20" rx="25" ry="13" fill="#b2ebf2" />
        <ellipse cx="90" cy="20" rx="20" ry="10" fill="#b2ebf2" />
      </svg>
      <svg className="absolute top-24 right-24 w-20 h-20 animate-sun-spin z-0" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="16" fill="#fffde7" />
        <g stroke="#ffe082" strokeWidth="3">
          <line x1="32" y1="4" x2="32" y2="16" />
          <line x1="32" y1="48" x2="32" y2="60" />
          <line x1="4" y1="32" x2="16" y2="32" />
          <line x1="48" y1="32" x2="60" y2="32" />
          <line x1="12" y1="12" x2="20" y2="20" />
          <line x1="44" y1="44" x2="52" y2="52" />
          <line x1="12" y1="52" x2="20" y2="44" />
          <line x1="44" y1="20" x2="52" y2="12" />
        </g>
      </svg>
      <svg className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 animate-leaf-sway z-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C10 10 2 18 16 30C30 18 22 10 16 2Z" fill="#a5d6a7" />
        <path d="M16 2C16 10 16 18 16 30" stroke="#388e3c" strokeWidth="2" />
      </svg>
      {/* Animated backgrounds */}
      <div className="absolute left-0 bottom-0 z-10 w-64 h-64 pointer-events-none select-none">
        <Lottie animationData={agricultureBg} loop autoplay style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-64 h-64 pointer-events-none select-none">
        <Lottie animationData={iotDigitalFarm} loop autoplay style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-900 mb-4 drop-shadow-lg">
            {t("hero.title1")}
            <span className="block bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-green-800 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 hover:scale-105 hover:shadow-lg transition">
              <MessageCircle className="mr-2 h-5 w-5" />
              {t("hero.start_chat")}
            </Button>
            <Button variant="earth" size="lg" className="text-lg px-8 py-4 hover:scale-105 hover:shadow-lg transition">
              <Camera className="mr-2 h-5 w-5" />
              {t("hero.identify_plants")}
            </Button>
          </div>
          {/* Central Lottie animation */}
          <div className="flex justify-center mt-8">
            <div className="w-72 h-72 rounded-full shadow-2xl bg-white/70 backdrop-blur-md flex items-center justify-center">
              <Lottie animationData={farmCorn} loop autoplay />
            </div>
          </div>
        </div>
        {/* Features grid with glassmorphism cards and animated icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <Card className="p-6 bg-white/60 backdrop-blur-md border border-green-200 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-2xl transition group">
            <div className="w-24 h-24 mb-4">
              <Lottie animationData={farmCorn} loop autoplay />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-yellow-700 transition">{t("hero.ai_chat_title")}</h3>
            <p className="text-green-900">{t("hero.ai_chat_desc")}</p>
          </Card>
          <Card className="p-6 bg-white/60 backdrop-blur-md border border-green-200 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-2xl transition group">
            <div className="w-20 h-20 mb-4">
              <Lottie animationData={farmCorn} loop autoplay />
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-2 group-hover:text-yellow-700 transition">Weather</h3>
            <p className="text-green-900">Live weather and smart advice for your farm.</p>
          </Card>
          <Card className="p-6 bg-white/60 backdrop-blur-md border border-green-200 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-2xl transition group">
            <div className="w-24 h-24 mb-4">
              <Lottie animationData={iotDigitalFarm} loop autoplay />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-yellow-700 transition">{t("hero.market_title")}</h3>
            <p className="text-green-900">{t("hero.market_desc")}</p>
          </Card>
        </div>
      </div>
    </section>
  );
};