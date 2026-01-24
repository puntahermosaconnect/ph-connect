import { Link } from "wouter";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { categories, listings, promotions } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <div className="bg-primary py-2 text-center text-white text-[10px] font-bold uppercase tracking-widest">
        Versión Live v1.0.4 - Datos Conectados
      </div>
      <MobileHeader />
      
      <main className="flex flex-col gap-6 pt-4">
        
        {/* Promotions Slider */}
        <section className="px-4">
            <Carousel 
                className="w-full"
                plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                ]}
            >
                <CarouselContent>
                    {promotions.map((promo) => (
                        <CarouselItem key={promo.id}>
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-md">
                                <img 
                                  src={promo.image} 
                                  alt={promo.title} 
                                  className="w-full h-full object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

        {/* Categories Grid */}
        <section className="px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl">Explorar por Categoría</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-3 gap-y-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categoria/${category.id}`}>
                <a className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center ${category.color} bg-opacity-25 shadow-sm border border-black/5`}>
                    <category.icon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground text-center leading-tight line-clamp-2 max-w-[80px] h-10 flex items-start justify-center">
                      {category.name}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Places Vertical List */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Lugares Populares</h2>
            <span className="text-xs text-primary font-medium">Ver todo</span>
          </div>
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

      </main>

      <MobileNav />
    </div>
  );
}
