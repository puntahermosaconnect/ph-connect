import { Listing } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-destructive shadow-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground hover:bg-primary font-medium backdrop-blur-sm">
            {listing.price}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="uppercase text-[10px] font-bold tracking-wider text-muted-foreground">
            {listing.category}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold text-foreground">{listing.rating}</span>
            <span className="text-xs text-muted-foreground">({listing.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {listing.name}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {listing.description}
        </p>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">{listing.address}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 border-t border-border/50 bg-muted/20 mt-auto flex gap-2">
        <div className="flex flex-wrap gap-2 py-3 w-full">
            {listing.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md border">
                    {tag}
                </span>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}
