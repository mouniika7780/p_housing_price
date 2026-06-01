"use client";
import { PropertyOutput } from "@/types/property";
import { Button } from "@/components/common/Button";
import { Bookmark, BarChart2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatPrice } from "@/utils/helper";

interface ResultCardProps {
  result: PropertyOutput;
  onAddCompare: (label: string) => void;
  onAddHistory: () => void;
  canAddMore: boolean;
}



const getDetailRows = (result: PropertyOutput) => [
  { label: "Square Footage", value: `${result.input_data.square_footage.toLocaleString()} sq ft` },
  { label: "Bedrooms", value: result.input_data.bedrooms },
  { label: "Bathrooms", value: result.input_data.bathrooms },
  { label: "Year Built", value: result.input_data.year_built },
  { label: "Lot Size", value: `${result.input_data.lot_size.toLocaleString()} sq ft` },
  { label: "Distance", value: `${result.input_data.distance_to_city_center} km` },
  { label: "School Rating", value: `${result.input_data.school_rating} / 10` },
  { label: "Confidence", value: result.confidence.toUpperCase() },
];

const getBarData = (result: PropertyOutput) => [
  { name: "Sq Ft", value: result.input_data.square_footage, fill: "#6366f1" },
  { name: "Lot Size", value: result.input_data.lot_size, fill: "#8b5cf6" },
  { name: "Year", value: result.input_data.year_built, fill: "#a78bfa" },
  { name: "Distance", value: result.input_data.distance_to_city_center, fill: "#c4b5fd" },
];





export const ResultCard = ({ result, onAddCompare, onAddHistory, canAddMore }: ResultCardProps) => {

  const handleAddCompare = () => {
    const label = `Property ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`;
    onAddCompare(label);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-slate-900">Estimated Price</h2>
        <span className={`badge ${result.confidence === "high" ? "badge-success" : "badge-warning"}`} > {result.confidence} confidence </span>
      </div>

      <div className="bg-indigo-50 rounded-lg p-6 mb-6 text-center" aria-live="polite" >
        <p className="text-sm text-indigo-600 font-medium mb-1"> Predicted Market Value </p>
        <p className="text-4xl font-bold text-indigo-700"> {formatPrice(result.predicted_price)} </p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3"> Property Summary </h3>
        <div className="divide-y divide-slate-100">
          {getDetailRows(result).map((row) => (<div key={row.label} className="flex items-center justify-between py-2.5">
            <span className="text-sm text-slate-500">{row.label}</span> <span className="text-sm font-medium text-slate-800">{row.value}</span> </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full h-56" role="img" aria-label="Bar chart of property features" >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getBarData(result)} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} width={60} />
              <Tooltip contentStyle={{
                fontSize: "12px", borderRadius: "8px", border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" size="md" fullWidth onClick={onAddHistory} aria-label="Save to history" leftIcon={<Bookmark size={16} />}
        > Save </Button>

        <Button variant="primary" size="md" fullWidth onClick={handleAddCompare} disabled={!canAddMore} aria-label="Add to comparison" leftIcon={<BarChart2 size={16} />}>
          {canAddMore ? "Compare" : "Max 3 reached"}
        </Button>
      </div>

    </div>
  );
};