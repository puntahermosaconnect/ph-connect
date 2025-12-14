import { Link } from "wouter";
import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import logo from "@assets/PUNTA_HERMOSA_(2)_1765672640261.png";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
              <img src={logo} alt="Punta Hermosa CONNECT Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-bold text-primary">Punta Hermosa</span>
                <span className="font-heading text-sm font-bold text-foreground tracking-widest">CONNECT</span>
              </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <Link href="/explorar" className="hover:text-primary transition-colors">Explorar</Link>
            <Link href="/eventos" className="hover:text-primary transition-colors">Eventos</Link>
            <Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar..." 
              className="w-full pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <User className="h-4 w-4" />
              <span>Ingresar</span>
            </Button>
            <Button size="sm" className="hidden sm:flex">
              Publicar Negocio
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/" className="font-medium text-lg">Inicio</Link>
                  <Link href="/explorar" className="font-medium text-lg">Explorar</Link>
                  <Link href="/eventos" className="font-medium text-lg">Eventos</Link>
                  <Link href="/contacto" className="font-medium text-lg">Contacto</Link>
                  <div className="h-px bg-border my-2" />
                  <Button className="w-full">Publicar Negocio</Button>
                  <Button variant="outline" className="w-full">Ingresar</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden border-t p-4 bg-background animate-in slide-in-from-top-2">
          <Input type="search" placeholder="Buscar lugares, servicios..." className="w-full" />
        </div>
      )}
    </nav>
  );
}
