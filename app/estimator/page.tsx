"use client";
import { useState } from "react";
import { PropertyForm } from "@/components/property/PropertyForm";
import { ResultCard } from "@/components/property/ResultCard";
import { HistoryTable } from "@/components/property/HistoryTable";
import { CompareView } from "@/components/property/CompareView";
import { usePrediction } from "@/components/hooks/usePrediction";
import { useHistory } from "@/components/hooks/useHistory";
import { useCompare } from "@/components/hooks/useCompare";
import { PropertyInput } from "@/types/property";
import { Button } from "@/components/common/Button";
import { HistoryItem } from "@/types/property";


const TABS = [
  {key:"estimator",label:"Estimator"},
  {key:"history",label:"History"},
  {key:"compare",label:"Compare"},
];

type TabKey= "estimator" | "history" | "compare";

export default function EstimatorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("estimator");

  const { predict, result, isLoading, error, reset } = usePrediction();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();
  const { compareList, addToCompare, removeFromCompare, clearCompare, canAddMore } = useCompare();


  const [reuseTrigger, setReuseTrigger] = useState(false);  
  const [reuseData,setReuseData] = useState<HistoryItem | null>(null);


  const handleSubmit = async (data: PropertyInput) => {
    setReuseData(null);
    await predict(data);
  };

  const handleSaveHistory = () => {
    if (result) {
      addToHistory(result.input_data, result);
      setActiveTab("history");
    }
  };

  const handleAddCompare = (label: string) => {
    if (result) {
      addToCompare(label, result.input_data, result);
      setActiveTab("compare");

    }
  };

  const handleReuse = (item: typeof history[0]) => {
    reset();
    setReuseData(item);
    setReuseTrigger(prev => !prev);
    setActiveTab("estimator");
  };


  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-slate-900">Property Price Estimator</h1>
        <p className="text-slate-500 mt-1"> Enter property details to get an price prediction </p>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit mb-8" role="tablist" aria-label="Estimator tabs">
        {TABS.map((tab) => (
          <Button  key={tab.key} role="tab" aria-selected={activeTab === tab.key} aria-controls={`panel-${tab.key}`} onClick={() => { setReuseData(null); setActiveTab(tab.key as TabKey)}} variant={activeTab === tab.key ? "primary" : "transparent"}
            className={"cursor-pointer"} size="sm" >
            {tab.label}
            {tab.key === "history" && history.length > 0 && (<span className="ml-2 badge badge-info">{history.length}</span> )}
            {tab.key === "compare" && compareList.length > 0 && (<span className="ml-2 badge badge-success">{compareList.length} </span>)}
          </Button>
        ))}
      </div>


      {activeTab === "estimator" && (
        <div role="tabpanel" id="panel-estimator" aria-labelledby="tab-estimator" >
          <div className="grid grid-cols-1 gap-6">
            <PropertyForm onSubmit={handleSubmit} isLoading={isLoading} error={error} CloseErrorToast={reset} reuseTrigger={reuseTrigger} reuseData={reuseData} />

            {result && (
              <ResultCard result={result} onAddHistory={handleSaveHistory} onAddCompare={handleAddCompare} canAddMore={canAddMore}/>
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div role="tabpanel" id="panel-history" aria-labelledby="tab-history">
          <HistoryTable history={history} onRemove={removeFromHistory} onClear={clearHistory} onReuse={handleReuse} />
        </div>
      )}

      {activeTab === "compare" && (
        <div role="tabpanel" id="panel-compare" aria-labelledby="tab-compare">
          <CompareView  compareList={compareList} onRemove={removeFromCompare} onClear={clearCompare} />
        </div>
      )}

    </div>
  );
}