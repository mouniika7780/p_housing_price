"use client";

import { HistoryItem } from "@/types/property";
import { Button }      from "@/components/common/Button";
import { Trash2, RefreshCw, Clock } from "lucide-react";
import {formatPrice,formatDate} from "@/utils/helper";
import { TABLE_COLUMNS } from "@/sampleData/propertyFields";

interface HistoryTableProps {
  history:HistoryItem[];
  onRemove:(id: string) => void;
  onClear:() => void;
  onReuse:(item: HistoryItem) => void;
}





const getCellValue = (key: string, item: HistoryItem) => {
  switch (key) {
    case "timestamp": return formatDate(item.timestamp);
    case "square_footage":  return `${item.input.square_footage.toLocaleString()} sqft`;
    case "bedrooms": return item.input.bedrooms;
    case "bathrooms": return item.input.bathrooms;
    case "year_built":return item.input.year_built;
    case "school_rating":return `${item.input.school_rating}/10`;
    case "predicted_price": return formatPrice(item.result.predicted_price);
    case "confidence":return item.result.confidence;
    default: return "-";
  }
};

const DeleteIcon = () => ( <Trash2 size={16} aria-hidden="true" />);

const ReuseIcon = () => ( <RefreshCw size={16} aria-hidden="true" />);

const EmptyState = () => (
  <div className="text-center py-12">
    <Clock size={48} className="mx-auto text-slate-300 mb-4" aria-hidden="true"/>
    <p className="text-slate-500 text-sm">No predictions yet</p>
    <p className="text-slate-400 text-xs mt-1">Submit a property to see history here </p>
  </div>
);

export const HistoryTable = ({ history,onRemove,onClear,onReuse,}: HistoryTableProps) => {

  if (history.length === 0) {
    return (
      <div className="card">
        <h2 className="text-slate-900 mb-2">Prediction History</h2>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-slate-900">Prediction History</h2>
          <p className="text-sm text-slate-500 mt-1"> {history.length} prediction{history.length > 1 ? "s" : ""} saved </p>
        </div>

        <Button variant="danger" size="sm" onClick={onClear} aria-label="Clear all history" > Clear All</Button>
      </div>

      <div className="overflow-x-auto">
        <table  className="w-full text-sm" role="table" aria-label="Prediction history table" >
          <thead>
            <tr className="border-b border-slate-200">
              {TABLE_COLUMNS.map((col) => (
                <th  key={col.key} scope="col"   className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap"
                > {col.label} </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors" >
                {TABLE_COLUMNS.filter((col) => col.key !== "actions").map((col) => (
                  <td key={col.key} className="py-3 pr-4 whitespace-nowrap text-slate-700" >
                    {col.key === "confidence" ? (
                      <span className={`badge ${ item.result.confidence === "high" ? "badge-success" : "badge-warning"}`}> {item.result.confidence} </span> ) : (
                      <span className={ col.key === "predicted_price" ? "font-semibold text-indigo-600": ""}>
                        {getCellValue(col.key, item)}
                      </span>
                    )}
                  </td>
                ))}

                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">

                    <Button variant="transparent" size="sm"  onClick={() => onReuse(item)}  aria-label={`Reuse prediction from ${formatDate(item.timestamp)}`}  leftIcon={<ReuseIcon />}>
                    Reuse
                    </Button>

                    <Button variant="danger" size="sm" onClick={() => onRemove(item.id)} aria-label={`Remove prediction from ${formatDate(item.timestamp)}`} leftIcon={<DeleteIcon />} >
                      Remove
                    </Button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};