import FullHeightGrid from "../components/ui/full-height-grid";

const gridItems = [
  {
    id: "shirts",
    title: "SHIRTS",
    subtitle: "New Collection",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
    href: "/men/shirts",
    size: "half" as const,
  },
  {
    id: "trousers",
    title: "TROUSERS",
    subtitle: "Spring/Summer 2024",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    href: "/men/trousers",
    size: "half" as const,
  },
  {
    id: "accessories",
    title: "ACCESSORIES",
    subtitle: "Complete Your Look",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    href: "/men/accessories",
    size: "half" as const,
  },
  {
    id: "shoes",
    title: "SHOES",
    subtitle: "Step Into Style",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    href: "/men/shoes",
    size: "half" as const,
  },
];

export default function ExamplePage() {
  return (
    <div className="min-h-screen">
      <FullHeightGrid items={gridItems} />
    </div>
  );
}
