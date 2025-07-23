import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, CloudRain, TrendingUp, Camera, Leaf, Menu, X, Sun, Eye } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { id: "home", label: t("nav.home"), icon: Leaf },
    { id: "chat", label: t("nav.ai_assistant"), icon: MessageCircle },
    { id: "weather", label: t("nav.weather"), icon: CloudRain },
    { id: "market", label: t("nav.market"), icon: TrendingUp },
    { id: "identify", label: t("nav.plant_id"), icon: Camera },
    { id: "soil", label: t("nav.soil_crop_advice"), icon: Sun },
    { id: "pest", label: t("nav.pest_disease"), icon: Eye },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">{t("nav.brand")}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-16">
          <div className="p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t("nav.brand_full")}</h1>
                <p className="text-sm text-muted-foreground">{t("nav.brand_subtitle")}</p>
              </div>
            </div>
            
            <Card className="p-1 bg-card/50 border-border">
              <div className="flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  // Assign animation classes based on icon type
                  let iconClass = "h-4 w-4 mr-2 transition-transform duration-300";
                  if (item.id === "soil") iconClass += " nav-animate-spin"; // Sun icon
                  if (item.id === "home") iconClass += " nav-animate-sway"; // Leaf icon
                  else iconClass += " group-hover:nav-animate-bounce";
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(item.id)}
                      className="transition-smooth"
                    >
                      <Icon className={iconClass} />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </Card>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex-col h-auto py-2 px-1"
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};