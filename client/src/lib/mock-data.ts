import { Store, Utensils, Activity, Home, Car, Calendar, Heart, Dumbbell } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface Listing {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  rating: number;
  reviews: number;
  image: string;
  price?: string;
  tags: string[];
}

export const categories: Category[] = [
  { id: "restaurants", name: "Restaurantes", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { id: "shops", name: "Tiendas", icon: Store, color: "bg-blue-100 text-blue-600" },
  { id: "sports", name: "Deportes", icon: Dumbbell, color: "bg-green-100 text-green-600" },
  { id: "holistic", name: "Holístico", icon: Heart, color: "bg-purple-100 text-purple-600" },
  { id: "real-estate", name: "Inmobiliaria", icon: Home, color: "bg-indigo-100 text-indigo-600" },
  { id: "transport", name: "Taxis", icon: Car, color: "bg-yellow-100 text-yellow-600" },
  { id: "events", name: "Eventos", icon: Calendar, color: "bg-pink-100 text-pink-600" },
  { id: "activities", name: "Actividades", icon: Activity, color: "bg-red-100 text-red-600" },
];

export const listings: Listing[] = [
  {
    id: "1",
    name: "La Casa del Café",
    category: "restaurants",
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
    category: "holistic",
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
    name: "Deportes Extremos",
    category: "sports",
    description: "Equipamiento deportivo y organización de aventuras al aire libre.",
    address: "Plaza Central 8",
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Aventura", "Equipo", "Tours"]
  },
  {
    id: "4",
    name: "Apartamentos Vista Mar",
    category: "real-estate",
    description: "Venta y alquiler de propiedades con las mejores vistas de la zona.",
    address: "Bulevar Costero 200",
    rating: 4.7,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    price: "$$$$",
    tags: ["Venta", "Alquiler", "Lujo"]
  },
  {
    id: "5",
    name: "Taxi Seguro",
    category: "transport",
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
    category: "shops",
    description: "Frutas, verduras y productos locales frescos directamente de los agricultores.",
    address: "Mercado Municipal, Puesto 5",
    rating: 4.8,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Orgánico", "Local", "Fresco"]
  }
];
