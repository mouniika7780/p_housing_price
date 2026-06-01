"use client";

import { useState,useEffect, ChangeEvent, FormEvent } from "react";
import { PropertyInput } from "@/types/property";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PROPERTY_FIELDS } from "@/sampleData/propertyFields";
import { HistoryItem } from "@/types/property";

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

interface PropertyFormProps {
  onSubmit: (data: PropertyInput) => Promise<void>;
  reuseTrigger: boolean;
  isLoading: boolean;
  reuseData: HistoryItem | null; 
  error: string | null;
  CloseErrorToast: () => void;
}

const INITIAL_VALUES:FormValues = Object.fromEntries(PROPERTY_FIELDS.map((f) => [f.name, ""]));

const INITIAL_ERRORS:FormErrors= Object.fromEntries(PROPERTY_FIELDS.map((f) => [f.name, ""]));

export const PropertyForm = ({
  onSubmit,
  isLoading,
  reuseData,
  error,
  reuseTrigger,
  CloseErrorToast
}: PropertyFormProps) => {
  console.log("error in form:", error);
  const [values,setValues]= useState<FormValues>(INITIAL_VALUES);
  const [errors,setErrors]= useState<FormErrors>(INITIAL_ERRORS);
  const [apiError, setApiError] = useState<string | null>(null);


  console.log("reuseData in form:", values,errors,apiError);


   useEffect(() => {
    if (reuseData) {
      const reusedValues = Object.fromEntries(PROPERTY_FIELDS.map((f) => [f.name,String(reuseData.input[f.name as keyof typeof reuseData.input])]));
      setValues(reusedValues);
      setErrors(INITIAL_ERRORS);
    }
  }, [reuseTrigger]);




  const validateField = (field: typeof PROPERTY_FIELDS[number],value: string): string => {
    if (value === "" || value === null || value === undefined) {
      return field.validation.required;
    }
    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      return `${field.label} must be a valid number`;
    }

    if (numValue < field.validation.min.value) {
      return field.validation.min.message;
    }

    if (numValue > field.validation.max.value) {
      return field.validation.max.message;
    }

    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    const field = PROPERTY_FIELDS.find((f) => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    PROPERTY_FIELDS.forEach((field) => {
      const error = validateField(field, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      } else {
        newErrors[field.name] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validateAll()) return;

    const payload = Object.fromEntries(
      PROPERTY_FIELDS.map((f) => [f.name, parseFloat(values[f.name])])
    ) as unknown as PropertyInput;

    try {
      await onSubmit(payload);
    } catch (err) {
      console.log("API Error:", err);
      setApiError(
        err instanceof Error ? err.message : "Prediction failed"
      );
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors(INITIAL_ERRORS);
    setApiError(null);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} noValidate aria-label="Property details form">

        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-slate-900">Property Details</h2>
            <p className="mt-1 text-sm text-slate-500">Fill in all fields to get an accurate price estimate</p>
          </div>
          <div>
          <Button type="button" variant="secondary" size="md" onClick={handleReset} disabled={isLoading} className="cursor-pointer" aria-label="Reset form" >
            Reset
          </Button>
          </div>
        </div>

        {(error || apiError) && (
          <div className="mb-6">
            <ErrorMessage variant="banner" message={error || apiError || ""} onClose={() =>{CloseErrorToast(); setApiError(null)}}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {PROPERTY_FIELDS.map((field) => (
            <Input
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              hint={field.hint}
              required
              value={values[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              min={field.validation.min.value}
              max={field.validation.max.value}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-1/2 cursor-pointer">
            {isLoading ? "Predicting..." : "Predict Price"}
          </Button>
        </div>

      </form>
    </div>
  );
};