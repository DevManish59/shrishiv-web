interface ProductDescriptionProps {
  description: string;
  points?: (string | null)[];
}

export default function ProductDescription({
  description,
  points,
}: ProductDescriptionProps) {
  // Filter out null/undefined points
  const validPoints = points?.filter((point) => point && point.trim()) || [];

  return (
    <div className="space-y-4 pt-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {validPoints.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            {validPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-600">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
