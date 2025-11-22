"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChartData?: any;
}

export default function SizeGuideModal({
  isOpen,
  onClose,
  sizeChartData,
}: SizeGuideModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !sizeChartData) return null;

  // Extract chart data
  const chartData = sizeChartData?.chartData || [];
  const rowCount = sizeChartData?.rowCount || 0;
  const colCount = sizeChartData?.colCount || 0;
  const imageUrls = sizeChartData?.imageUrls || [];

  // Get headers from first row if available
  const headers = chartData.length > 0 ? chartData?.[0] : [];

  // Ensure headers match colCount - pad or trim if needed
  const normalizedHeaders =
    colCount > 0
      ? headers
          .slice(0, colCount)
          .concat(new Array(Math.max(0, colCount - headers.length)).fill(""))
      : headers;

  // Get data rows (skip first row if it's used as headers)
  let dataRows: string[][] =
    chartData.length > 1 ? chartData.slice(1) : chartData;

  // Limit rows to rowCount if specified
  if (rowCount > 0 && dataRows.length > rowCount) {
    dataRows = dataRows.slice(0, rowCount);
  }

  // Normalize each row to match colCount
  const normalizedRows =
    dataRows?.map((row: string[]) => {
      const normalizedRow = row?.slice(0, colCount || row.length);
      // Pad row if it has fewer cells than colCount
      if (colCount > 0 && normalizedRow?.length < colCount) {
        return normalizedRow?.concat(
          new Array(colCount - normalizedRow.length).fill("")
        );
      }
      return normalizedRow;
    }) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium">
              {sizeChartData.name || "SIZE GUIDE"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:opacity-70 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          <div className="p-6 space-y-6">
            {/* Description */}
            {sizeChartData.shortDescription && (
              <div>
                <p className="text-sm text-gray-600">
                  {sizeChartData.shortDescription}
                </p>
              </div>
            )}

            {/* Images - Display in one row, one image per column */}
            {imageUrls.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-medium">Size Chart Images</h3>
                <div
                  className="flex flex-wrap gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${imageUrls.length}, minmax(0, 1fr))`,
                  }}
                >
                  {imageUrls.map((imageUrl: string, index: number) => (
                    <div
                      key={`size-chart-image-${index}-${imageUrl.slice(-20)}`}
                      className="relative flex-1 min-w-[200px] aspect-video bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Size chart image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Size Table */}
            {chartData.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-medium">Size Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    {normalizedHeaders.length > 0 && (
                      <thead>
                        <tr>
                          {normalizedHeaders.map(
                            (header: string, index: number) => (
                              <th
                                key={`header-${index}-${header}`}
                                className="text-left p-3 border-b border-gray-300 font-medium bg-gray-50"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {normalizedRows.map((row: string[], rowIndex: number) => (
                        <tr
                          key={`row-${rowIndex}-${row[0] || rowIndex}`}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          {row.map((cell: string, cellIndex: number) => (
                            <td
                              key={`cell-${rowIndex}-${cellIndex}-${cell}`}
                              className="p-3 text-gray-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fallback message if no data */}
            {chartData.length === 0 && imageUrls.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No size chart data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
