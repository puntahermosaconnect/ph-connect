import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { categories, listings } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <MobileHeader />
      
      <main className="flex flex-col gap-6 pt-4">
        {/* Categories Horizontal Scroll */}
        <section>
          <div className="px-4 mb-3 flex items-center justify-between">
            <h2 className="font-bold text-lg">Categorías</h2>
            <span className="text-xs text-primary font-medium">Ver todo</span>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 px-4 pb-4">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${category.color} bg-opacity-20 shadow-sm`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{category.name}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Featured Banner */}
        <section className="px-4">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop" 
              alt="Evento destacado" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
              <Badge className="w-fit mb-2 bg-secondary text-secondary-foreground border-none">Esta semana</Badge>
              <h3 className="font-bold text-lg leading-none">Feria Gastronómica</h3>
              <p className="text-sm text-white/80">Sábado 15 • Plaza Central</p>
            </div>
          </div>
        </section>

        {/* Popular Places Vertical List */}
        <section className="px-4">
          <h2 className="font-bold text-lg mb-3">Populares cerca de ti</h2>
          <div className="flex flex-col gap-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="flex gap-3 p-3 overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={listing.image} 
                    alt={listing.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base line-clamp-1">{listing.name}</h3>
                      <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {listing.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{listing.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{listing.address}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {listing.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Horizontal Listings (Trending) */}
        <section className="pb-8">
          <div className="px-4 mb-3">
            <h2 className="font-bold text-lg">Nuevos en la app</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 px-4 pb-4">
              {listings.slice(0, 4).reverse().map((listing) => (
                <div key={listing.id} className="w-48">
                  <div className="relative w-48 h-32 rounded-xl overflow-hidden mb-2">
                    <img 
                      src={listing.image} 
                      alt={listing.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-bold">
                      {listing.price}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm truncate">{listing.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{listing.category}</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}
