import { 
  Palette, Compass, Utensils, ShoppingBag, Users, Waves, GraduationCap, 
  BedDouble, Calendar, Landmark, Home, Dog, Car, Stethoscope, Wrench, 
  Siren, Heart
} from "lucide-react";

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
  phone?: string;
  whatsapp?: string;
  rating: number;
  reviews: number;
  image: string;
  price?: string;
  tags: string[];
  lat?: number;
  lng?: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Order: Comer, Deportes, Estadía, AVEC TRIP, Eventos, Arte & Cultura, Comprar, Salud, Moverte, Mascotas, Vida & Bienestar, Comunidad, Educación, Servicios, Inmobiliaria, Gubernamental, Teléfonos de Emergencia.
export const categories: Category[] = [
  { 
    id: "comer", 
    name: "Comer", 
    icon: Utensils, 
    color: "bg-orange-100 text-orange-600",
    subcategories: ["Restaurantes", "Cafés", "Bares", "Delivery"]
  },
  { 
    id: "deportes", 
    name: "Deportes", 
    icon: Waves, 
    color: "bg-cyan-100 text-cyan-600",
    subcategories: ["Surf", "Fútbol", "Skate Park", "Voley Playa"]
  },
  { 
    id: "estadia", 
    name: "Estadía", 
    icon: BedDouble, 
    color: "bg-indigo-100 text-indigo-600",
    subcategories: ["Hoteles", "Hostels", "Casas", "Departamentos"]
  },
  { 
    id: "avec-trip", 
    name: "AVEC TRIP", 
    icon: Compass, 
    color: "bg-emerald-100 text-emerald-600",
    subcategories: ["Tours", "Experiencias", "Guías"]
  },
  { 
    id: "eventos", 
    name: "Eventos", 
    icon: Calendar, 
    color: "bg-pink-100 text-pink-600",
    subcategories: ["Fiestas", "Campeonatos", "Culturales"]
  },
  { 
    id: "arte-cultura", 
    name: "Arte & Cultura", 
    icon: Palette, 
    color: "bg-purple-100 text-purple-600",
    subcategories: ["Galerías", "Talleres", "Música"]
  },
  { 
    id: "comprar", 
    name: "Comprar", 
    icon: ShoppingBag, 
    color: "bg-blue-100 text-blue-600",
    subcategories: ["Tiendas", "Minimarkets", "Farmacias"]
  },
  { 
    id: "salud", 
    name: "Salud", 
    icon: Stethoscope, 
    color: "bg-red-100 text-red-600",
    subcategories: ["Posta Médica", "Consultorios", "Farmacias"]
  },
  { 
    id: "moverte", 
    name: "Moverte", 
    icon: Car, 
    color: "bg-yellow-100 text-yellow-600",
    subcategories: ["Taxis", "Mototaxis", "Transporte Público"]
  },
  { 
    id: "mascotas", 
    name: "Mascotas", 
    icon: Dog, 
    color: "bg-amber-100 text-amber-600",
    subcategories: ["Veterinarias", "Pet Shops", "Paseadores"]
  },
  { 
    id: "vida-bienestar", 
    name: "Vida & Bienestar", 
    icon: Heart, 
    color: "bg-green-100 text-green-600",
    subcategories: ["Yoga", "Masajes", "Spa", "Gimnasios"]
  },
  { 
    id: "comunidad", 
    name: "Comunidad", 
    icon: Users, 
    color: "bg-teal-100 text-teal-600",
    subcategories: ["Vecinos", "Voluntariado", "Noticias"]
  },
  { 
    id: "educacion", 
    name: "Educación", 
    icon: GraduationCap, 
    color: "bg-sky-100 text-sky-600",
    subcategories: ["Colegios", "Nidos", "Talleres"]
  },
  { 
    id: "servicios", 
    name: "Servicios", 
    icon: Wrench, 
    color: "bg-slate-100 text-slate-600",
    subcategories: ["Gasfitería", "Electricidad", "Carpintería"]
  },
  { 
    id: "inmobiliaria", 
    name: "Inmobiliaria", 
    icon: Home, 
    color: "bg-rose-100 text-rose-600",
    subcategories: ["Venta", "Alquiler", "Agentes"]
  },
  { 
    id: "gubernamental", 
    name: "Gubernamental", 
    icon: Landmark, 
    color: "bg-stone-100 text-stone-600",
    subcategories: ["Municipalidad", "Comisaría"]
  },
  { 
    id: "emergencia", 
    name: "Emergencia", 
    icon: Siren, 
    color: "bg-red-50 text-red-600 border border-red-200",
    subcategories: ["Policía", "Bomberos", "Serenazgo"]
  },
];

export const promotions: Promotion[] = [
  {
    id: "p1",
    title: "2x1 en Makis",
    description: "Todos los martes en Sushito Beach",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "Clase de Surf Gratis",
    description: "Primera clase gratis con Punta Surf School",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p3",
    title: "Happy Hour Sunset",
    description: "5pm a 8pm en El Mirador",
    image: "https://images.unsplash.com/photo-1536935338725-8f32e7c4f103?q=80&w=800&auto=format&fit=crop"
  }
];

export const listings: Listing[] = [
  {
    id: "1",
    name: "La Casa del Café",
    category: "Comer",
    subcategory: "Cafés",
    description: "El mejor café orgánico y desayunos saludables en el centro de la comunidad.",
    address: "Av. Principal 123",
    phone: "999111222",
    whatsapp: "999111222",
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
    subcategory: "Yoga",
    description: "Clases de yoga, meditación y terapias alternativas para tu bienestar integral.",
    address: "Calle de la Paz 45",
    phone: "999333444",
    whatsapp: "999333444",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1599447421405-0bfbca0e0431?q=80&w=800&auto=format&fit=crop",
    price: "$$$",
    tags: ["Yoga", "Meditación", "Salud"]
  },
  {
    id: "3",
    name: "Punta Surf School",
    category: "Deportes",
    subcategory: "Surf",
    description: "Clases de surf para todas las edades y niveles.",
    address: "Playa Norte",
    phone: "999555666",
    whatsapp: "999555666",
    rating: 4.8,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Aventura", "Surf", "Clases"]
  },
  {
    id: "4",
    name: "Apartamentos Vista Mar",
    category: "Estadía",
    subcategory: "Departamentos",
    description: "Alquiler de departamentos con las mejores vistas de la zona.",
    address: "Bulevar Costero 200",
    phone: "999777888",
    whatsapp: "999777888",
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
    phone: "999000111",
    whatsapp: "999000111",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
    price: "$",
    tags: ["24h", "Seguro", "Rápido"]
  },
  {
    id: "6",
    name: "Minimarket El Sol",
    category: "Comprar",
    subcategory: "Minimarkets",
    description: "Frutas, verduras y productos locales frescos directamente de los agricultores.",
    address: "Mercado Municipal, Puesto 5",
    phone: "999222333",
    whatsapp: "999222333",
    rating: 4.8,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format&fit=crop",
    price: "$$",
    tags: ["Orgánico", "Local", "Fresco"]
  },
];
