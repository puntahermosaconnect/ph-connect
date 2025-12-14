import { categories } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Explora por Categoría</h2>
          <p className="text-muted-foreground max-w-2xl">
            Navega fácilmente por las diferentes secciones para encontrar exactamente lo que necesitas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full bg-card/50 backdrop-blur-sm"
              >
                <div className={`p-4 rounded-full ${category.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <span className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
