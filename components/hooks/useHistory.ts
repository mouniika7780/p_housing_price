import { useState, useEffect } from "react";
import { HistoryItem, PropertyInput, PropertyOutput } from "@/types/property";

interface UseHistoryReturn {
  history: HistoryItem[];
  addToHistory: (input: PropertyInput, result: PropertyOutput) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const HISTORY_KEY = "housing_prediction_history";
const MAX_HISTORY = 10; // max to show the history list latest  10 predictions

export const useHistory = (): UseHistoryReturn => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      console.error("Failed to load history");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      console.error("Failed to save history");
    }
  }, [history]);

  const addToHistory = (input: PropertyInput, result: PropertyOutput) => {
    const newItem: HistoryItem = { id: crypto.randomUUID(), timestamp: new Date().toISOString(), input, result, };
    setHistory((prev) => {
      const updated = [newItem, ...prev];
      return updated.slice(0, MAX_HISTORY);
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};