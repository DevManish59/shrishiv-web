interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <div className="space-y-4 pt-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
