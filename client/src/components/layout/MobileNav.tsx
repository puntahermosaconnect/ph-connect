import { Home, Search, Heart, User, Calendar } from "lucide-react";
import { Link, useLocation } from "wouter";

export function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link href="/" className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Inicio</span>
        </Link>
        <Link href="/explorar" className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive('/explorar') ? 'text-primary' : 'text-muted-foreground'}`}>
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium">Explorar</span>
        </Link>
        <Link href="/eventos" className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive('/eventos') ? 'text-primary' : 'text-muted-foreground'}`}>
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-medium">Eventos</span>
        </Link>
        <Link href="/guardados" className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive('/guardados') ? 'text-primary' : 'text-muted-foreground'}`}>
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-medium">Favoritos</span>
        </Link>
        <Link href="/perfil" className={`flex flex-col items-center gap-1 w-full h-full justify-center ${isActive('/perfil') ? 'text-primary' : 'text-muted-foreground'}`}>
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
