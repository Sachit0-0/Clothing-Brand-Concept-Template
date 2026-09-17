"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Patan Linen Shirt",
    description: "Essentials",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800",
  },
  {
    title: "Annapurna Puffer Jacket",
    description: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
  },
  {
    title: "Bhaktapur Raw Denim",
    description: "Bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
  },
  {
    title: "Himalayan Merino Knit",
    description: "Knitwear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800",
  },
  {
    title: "Thamel Streetwear Tee",
    description: "Essentials",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  },
  {
    title: "Pokhara Cargo Pant",
    description: "Bottoms",
    image: "https://images.unsplash.com/photo-1617952236317-0bd127407984?q=80&w=800",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        {/* §15 section heading: -0.02em tracking, tight leading */}
        <h2 className="text-heading text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
          Crafted with Purpose.
          <br />
          Worn with Pride.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          Craftsmanship
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="press-card cursor-pointer group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Content */}
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>
    </section>
  );
}
