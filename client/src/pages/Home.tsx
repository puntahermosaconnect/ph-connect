import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ListingCard } from "@/components/listings/ListingCard";
import { listings } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        <CategoryGrid />
        
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Lugares Destacados</h2>
                <p className="text-muted-foreground">Los negocios mejor calificados por tu comunidad</p>
              </div>
              <Button variant="ghost" className="hidden md:flex gap-2 text-primary hover:text-primary/80">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" className="w-full">
                Ver todos los lugares
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">¿Tienes un negocio?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              Únete a la comunidad digital y llega a más clientes. Registra tu negocio hoy mismo totalmente gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg font-bold px-8 shadow-lg">
                Registrar mi Negocio
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-bold px-8 bg-transparent border-white text-white hover:bg-white/10">
                Saber más
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">Comunidad<span className="text-primary">Connect</span></h3>
              <p className="text-sm leading-relaxed">
                Conectando personas con los mejores servicios y negocios locales. Apoya a tu comunidad, compra local.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Restaurantes</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Servicios</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Inmobiliaria</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Comunidad</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ayuda</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Recibe las últimas novedades y ofertas locales.</p>
              <div className="flex gap-2">
                <Input placeholder="Tu email" className="bg-slate-800 border-slate-700 text-white h-10" />
                <Button size="sm">Suscribir</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            &copy; 2024 Comunidad Connect. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
