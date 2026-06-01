import { useState } from "react";
import { PropertyInput, PropertyOutput } from "@/types/property";
import { propertyServices } from "@/services/propertyServices";

interface UsePredictionReturn {
  predict: (input: PropertyInput) => Promise<void>;
  result: PropertyOutput | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export const usePrediction = (): UsePredictionReturn => {
  const [result, setResult] = useState<PropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = async (input: PropertyInput) => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);
      const response = await propertyServices.predictPrice(input);
      setResult(response);
    } catch (err) {
      console.log("API Error in usePrediction:",  err );
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return { predict, result, isLoading, error, reset };
};