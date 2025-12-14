import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/sunny_town_square_community_header.png";

export function Hero() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Comunidad vibrante" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white drop-shadow-lg max-w-4xl leading-tight">
          Descubre lo mejor de tu <span className="text-secondary">comunidad</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md font-medium">
          Encuentra restaurantes, servicios, eventos y todo lo que necesitas en un solo lugar.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-3xl mt-6 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <Input 
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-secondary focus-visible:border-secondary rounded-xl"
                placeholder="¿Qué estás buscando? (ej. Tacos, Yoga, Plomero)"
              />
            </div>
            <div className="relative flex-1 md:max-w-[200px]">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-white/70" />
              <Input 
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-secondary focus-visible:border-secondary rounded-xl"
                placeholder="Ubicación"
                defaultValue="Centro"
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Buscar
            </Button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-white/80">
          <span>Populares:</span>
          <button className="hover:text-white hover:underline decoration-secondary underline-offset-4">Restaurantes</button>
          <button className="hover:text-white hover:underline decoration-secondary underline-offset-4">Eventos Hoy</button>
          <button className="hover:text-white hover:underline decoration-secondary underline-offset-4">Inmobiliaria</button>
        </div>
      </div>
    </div>
  );
}
