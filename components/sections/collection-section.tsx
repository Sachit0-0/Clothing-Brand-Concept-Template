"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "Kathmandu Canvas Tote",
    description: "Woven cotton tote with hand-stitched Nepali detailing",
    price: "$42",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
  },
  {
    id: 2,
    name: "Himalayan Merino Beanie",
    description: "100% merino wool, naturally temperature-regulating",
    price: "$38",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800",
  },
  {
    id: 3,
    name: "Patan Woven Scarf",
    description: "Soft hand-loomed scarf inspired by Patan's textile heritage",
    price: "$55",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800",
  },
  {
    id: 4,
    name: "Mustang Leather Belt",
    description: "Full-grain leather belt with brushed brass hardware",
    price: "$65",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
  },
  {
    id: 5,
    name: "Pokhara 5-Panel Cap",
    description: "Structured cotton cap with embroidered NEPALÉ script",
    price: "$32",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800",
  },
  {
    id: 6,
    name: "Everest Trail Socks",
    description: "Cushioned merino-blend socks for all-day comfort",
    price: "$22",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Complete the Look
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel — §12 right-edge fade hints at more content */}
        <div
          className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
          }}
        >
          {accessories.map((accessory) => (
            <div key={accessory.id} className="press-card cursor-pointer group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="press-card cursor-pointer group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
