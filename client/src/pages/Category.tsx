import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, MessageCircle, ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/google-sheets";
import { getListingsByCategory } from "@/lib/google-sheets";
import { Link } from "wouter";

export default function Category() {
  const [, params] = useRoute("/categoria/:categoryId");
  const categoryId = params?.categoryId as string;
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryName = categoryId
    ? categoryId.replace(/-/g, " ").toUpperCase()
    : "Categoría";

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      const data = await getListingsByCategory(categoryId);
      setListings(data);
      setLoading(false);
    };

    if (categoryId) {
      loadListings();
    }
  }, [categoryId]);

  // Group listings by subcategory and sub-subcategory
  const groupedListings: Record<string, Record<string, Listing[]>> = {};
  listings.forEach((listing) => {
    const sub = listing.subcategory || "General";
    const subSub = listing.subSubcategory || "Principal";
    if (!groupedListings[sub]) groupedListings[sub] = {};
    if (!groupedListings[sub][subSub]) groupedListings[sub][subSub] = [];
    groupedListings[sub][subSub].push(listing);
  });

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <MobileHeader />

      <main className="flex flex-col">
        {/* Header with back button */}
        <div className="px-4 py-4 border-b border-border bg-muted/30">
          <Link href="/">
            <a className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" />
              Volver
            </a>
          </Link>
          <h1 className="text-3xl font-bold mt-2 tracking-tight">{categoryName}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {listings.length} lugar{listings.length !== 1 ? "es" : ""} encontrados
          </p>
        </div>

        {/* Listings */}
        <div className="flex flex-col p-4 gap-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <span>Cargando negocios de {categoryName}...</span>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No hay negocios registrados en esta categoría aún.
            </div>
          ) : (
            Object.entries(groupedListings).map(([subcategory, subSubGroups]) => (
              <div key={subcategory} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold border-l-4 border-primary pl-3 py-1 bg-primary/5 rounded-r">
                  {subcategory}
                </h2>
                
                {Object.entries(subSubGroups).map(([subSubcategory, items]) => (
                  <div key={subSubcategory} className="flex flex-col gap-3">
                    {subSubcategory !== "Principal" && (
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
                        {subSubcategory}
                      </h3>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((listing) => (
                        <Card
                          key={listing.id}
                          className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col"
                        >
                          <div className="aspect-video w-full overflow-hidden bg-muted">
                            <img
                              src={listing.image}
                              alt={listing.name}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                          </div>

                          <div className="p-4 flex flex-col flex-1">
                            <h4 className="font-bold text-lg leading-tight mb-2">
                              {listing.name}
                            </h4>

                            <div className="flex flex-col gap-2 mb-4 flex-1">
                              {listing.address && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                  <span>{listing.address}</span>
                                </div>
                              )}
                              
                              {listing.rrss && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                  <span className="truncate">{listing.rrss}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                              {listing.phone && (
                                <a
                                  href={`tel:+51${listing.phone.replace(/\D/g, "")}`}
                                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                                >
                                  <Phone className="w-4 h-4" />
                                  Llamar
                                </a>
                              )}
                              {listing.whatsapp && (
                                <a
                                  href={`https://wa.me/51${listing.whatsapp.replace(/\D/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  WhatsApp
                                </a>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
