import Image from "next/image";

interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export default function CollectionHeader({
  collection,
}: {
  collection: Collection;
}) {
  console.log("collection.name[slug]::", collection.name);
  return (
    <div className="relative h-[300px] overflow-hidden">
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {collection.name}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>
    </div>
  );
}
