import { Store, Utensils, Activity, Home, Car, Calendar, Heart, Dumbbell, Hotel, Phone } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  subcategories?: string[];
}

export interface Listing {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  address: string;
  rating: number;
  reviews: number;
  image: string;
  price?: string;
  tags: string[];
}

export const categories: Category[] = [
  { 
    id: "comer", 
    name: "Comer", 
    icon: Utensils, 
    color: "bg-orange-100 text-orange-600",
    subcategories: ["Restaurantes", "Cafés", "Bares", "Delivery/Dark Kitchen"]
  },
  { 
    id: "comprar", 
    name: "Comprar", 
    icon: Store, 
    color: "bg-blue-100 text-blue-600",
    subcategories: ["Tiendas", "Minimarkets", "Farmacias", "Ferreterías"]
  },
  { 
    id: "servicios", 
    name: "Servicios", 
    icon: Activity, 
    color: "bg-gray-100 text-gray-600",
    subcategories: ["Gas", "Gasfitería", "Carpintería", "Electricistas", "Técnicos", "Cuidado de niños", "Limpieza de hogar", "Mantenimiento de Piscinas", "Otros oficios"]
  },
  { 
    id: "moverte", 
    name: "Moverte", 
    icon: Car, 
    color: "bg-yellow-100 text-yellow-600",
    subcategories: ["Taxis", "Mototaxis", "Transporte local", "Grúas"]
  },
  { 
    id: "vida-bienestar", 
    name: "Vida & Bienestar", 
    icon: Heart, 
    color: "bg-green-100 text-green-600",
    subcategories: ["Terapias holísticas", "Baile", "Gimnasios"]
  },
  { 
    id: "deportes", 
    name: "Deportes", 
    icon: Dumbbell, 
    color: "bg-red-100 text-red-600",
    subcategories: ["Surf", "Futbol", "Skate Park", "Voley Playa", "Karate", "Box", "Brazilian Jiu Jitsu", "Capoeira"]
  },
  { 
    id: "estadia", 
    name: "Estadía Temporal", 
    icon: Hotel, 
    color: "bg-indigo-100 text-indigo-600",
    subcategories: ["Casas (alquiler temporal)", "Departamentos (alquiler)", "Hostels", "Habitaciones"]
  },
  { 
    id: "inmuebles", 
    name: "Inmuebles", 
    icon: Home, 
    color: "bg-purple-100 text-purple-600",
    subcategories: ["Alquiler anual", "Venta de casas", "Venta de departamentos", "Agentes inmobiliarios"]
  },
  { 
    id: "eventos", 
    name: "Eventos", 
    icon: Calendar, 
    color: "bg-pink-100 text-pink-600",
    subcategories: ["Fiestas", "Campeonatos de surf", "Fechas patrias", "Actividades culturales", "Eventos municipales"]
  },
  { 
    id: "emergencia", 
    name: "Teléfonos de Emergencia", 
    icon: Phone, 
    color: "bg-rose-100 text-rose-600",
    subcategories: ["Seguridad Ciudadana", "Comisaría", "Serenazgo", "SAMU", "Bomberos", "Municipalidad", "Centro de Salud"]
  },
];

export const listings: Listing[] = [
  {
    id: "1",
    name: "La Casa del Café",
    category: "Comer",
    subcategory: "Cafés",
    description: "El mejor café orgánico y desayunos saludables en el centro de la comunidad.",
    address: "Av. Principal 123",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Café", "Desayuno", "Wifi Gratis"]
  },
  {
    id: "2",
    name: "Yoga & Bienestar",
    category: "Vida & Bienestar",
    subcategory: "Terapias holísticas",
    description: "Clases de yoga, meditación y terapias alternativas para tu bienestar integral.",
    address: "Calle de la Paz 45",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1599447421405-0bfbca0e0431?q=80&w=800&auto=format&fit=crop",
    price: "$$$",
    tags: ["Yoga", "Meditación", "Salud"]
  },
  {
    id: "3",
    name: "Escuela de Surf",
    category: "Deportes",
    subcategory: "Surf",
    description: "Clases de surf para todas las edades y niveles.",
    address: "Playa Norte",
    rating: 4.8,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Aventura", "Surf", "Clases"]
  },
  {
    id: "4",
    name: "Apartamentos Vista Mar",
    category: "Estadía Temporal",
    subcategory: "Departamentos (alquiler)",
    description: "Alquiler de departamentos con las mejores vistas de la zona.",
    address: "Bulevar Costero 200",
    rating: 4.7,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    price: "$$$$",
    tags: ["Vista al Mar", "Alquiler", "Lujo"]
  },
  {
    id: "5",
    name: "Taxi Seguro",
    category: "Moverte",
    subcategory: "Taxis",
    description: "Servicio de transporte confiable y seguro las 24 horas.",
    address: "Servicio a Domicilio",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
    price: "$",
    tags: ["24h", "Seguro", "Rápido"]
  },
  {
    id: "6",
    name: "Mercado Orgánico",
    category: "Comprar",
    subcategory: "Minimarkets",
    description: "Frutas, verduras y productos locales frescos directamente de los agricultores.",
    address: "Mercado Municipal, Puesto 5",
    rating: 4.8,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Orgánico", "Local", "Fresco"]
  }
];
