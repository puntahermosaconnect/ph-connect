import { Search, Bell, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@assets/generated_images/minimalist_wave_and_sun_logo_icon.png";

export function MobileHeader() {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border pt-safe-top">
      <div className="px-4 py-3 flex flex-col gap-3">
        {/* Branding Row */}
        <div className="flex items-center gap-2 pb-1">
            <img src={logo} alt="Punta Hermosa CONNECT Logo" className="w-8 h-8 object-contain" />
            <span className="font-heading text-xl font-bold text-primary tracking-tight">
              Punta Hermosa <span className="text-foreground">CONNECT</span>
            </span>
        </div>

        {/* Top Row: Location & Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">San Miguel, Centro</span>
            <span className="text-xs text-muted-foreground">▼</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="¿Qué buscas hoy?" 
            className="pl-9 bg-muted/50 border-none h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
