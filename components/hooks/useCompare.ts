import { useState } from "react";
import { CompareItem, PropertyInput, PropertyOutput } from "@/types/property";

interface UseCompareReturn {
  compareList: CompareItem[];
  addToCompare: (label: string, input: PropertyInput, result: PropertyOutput) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  canAddMore: boolean;
}

const MAX_COMPARE = 3; // max properties 3 to compare  side by side

export const useCompare = (): UseCompareReturn => {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);

  const addToCompare = ( label: string,input: PropertyInput,result: PropertyOutput) => {
    if (compareList.length >= MAX_COMPARE) return; 
    const newItem: CompareItem = {id:crypto.randomUUID(),label,input,result};
    setCompareList((prev) => [...prev, newItem]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (id: string): boolean => {
    return compareList.some((item) => item.id === id);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAddMore: compareList.length < MAX_COMPARE,
  };
};