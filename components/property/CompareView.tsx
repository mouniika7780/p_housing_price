"use client";

import { CompareItem } from "@/types/property";
import { Button }      from "@/components/common/Button";
import { X, BarChart2 } from "lucide-react";
import { formatPrice } from "@/utils/helper";
import { COMPARE_ROWS } from "@/sampleData/propertyFields";

interface CompareViewProps {
  compareList:  CompareItem[];
  onRemove: (id: string) => void;
  onClear:  () => void;
}

const getCellValue = (key: string, item: CompareItem): string => {
  switch (key) {
    case "predicted_price":return formatPrice(item.result.predicted_price);
    case "square_footage": return `${item.input.square_footage.toLocaleString()} sq ft`;
    case "bedrooms": return `${item.input.bedrooms}`;
    case "bathrooms": return `${item.input.bathrooms}`;
    case "year_built": return `${item.input.year_built}`;
    case "lot_size": return `${item.input.lot_size.toLocaleString()} sq ft`;
    case "distance_to_city_center": return `${item.input.distance_to_city_center} km`;
    case "school_rating":  return `${item.input.school_rating} / 10`;
    case "confidence":return item.result.confidence;
    default: return "-";
  }
};

const getBestIndex = (key: string, compareList: CompareItem[]): number => {
  const values = compareList.map((item) => {
    switch (key) {
      case "predicted_price":return item.result.predicted_price;
      case "square_footage": return item.input.square_footage;
      case "bedrooms":return item.input.bedrooms;
      case "bathrooms": return item.input.bathrooms;
      case "year_built":return item.input.year_built;
      case "lot_size":return item.input.lot_size;
      case "school_rating": return item.input.school_rating;
      case "distance_to_city_center": return -item.input.distance_to_city_center;
      default: return 0;
    }
  });
  return values.indexOf(Math.max(...values));
};

const RemoveIcon = () => (<X  size={16} aria-hidden="true" /> );

const EmptyState = () => (
  <div className="text-center py-12">
    <BarChart2 size={48} className="mx-auto text-slate-300 mb-4" aria-hidden="true" />
    <p className="text-slate-500 text-sm">No properties to compare</p>
    <p className="text-slate-400 text-xs mt-1"> Add up to 3 properties using the Compare button </p>
  </div>
);

export const CompareView = ({ compareList,onRemove,onClear,}: CompareViewProps) => {

  if (compareList.length === 0) {
    return (
      <div className="card">
        <h2 className="text-slate-900 mb-2">Compare Properties</h2>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="card">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-slate-900">Compare Properties</h2>
          <p className="text-sm text-slate-500 mt-1"> Comparing {compareList.length} of 3 properties </p>
        </div>
        <Button variant="danger" size="sm" onClick={onClear} aria-label="Clear all comparisons"> Clear All </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Property comparison table">

          <thead>
            <tr className="border-b border-slate-200">

              <th className="pb-3 pr-4 w-40" />

              {compareList.map((item) => (
                <th key={item.id} scope="col" className="pb-3 pr-4 text-left">
                  <div className="flex items-center justify-between gap-2">

                    <span className="text-sm font-semibold text-slate-700"> {item.label} </span>

                    <Button variant="transparent" size="sm" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.label} from comparison`} leftIcon={<RemoveIcon />} >
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {COMPARE_ROWS.map((row) => {
              const bestIndex = getBestIndex(row.key, compareList);


              return (
                <tr key={row.key} className="hover:bg-slate-50 transition-colors" >
                  <td className="py-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    {row.label}
                  </td>

                  {compareList.map((item, index) => {
                    const isBest = index === bestIndex && row.key  !== "confidence" && compareList.length > 1;

                    return (
                      <td
                        key={item.id}
                        className={`  py-3 pr-4 whitespace-nowrap font-medium  ${isBest ? "text-green-600" : "text-slate-700"} `}
                        aria-label={  isBest  ? `${row.label}: ${getCellValue(row.key, item)} (best)`  : undefined }  >
                        {row.key === "confidence" ? (
                          <span className={`badge ${item.result.confidence === "high" ? "badge-success" : "badge-warning" }`} >
                            {item.result.confidence}
                          </span>

                        ) : (
                          <span>
                            {getCellValue(row.key, item)}
                            {isBest && <span  className="ml-1 text-xs text-green-500"  aria-label="best value">Best </span>}
                          </span>
                        )}

                      </td>
                    );
                  })}

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};