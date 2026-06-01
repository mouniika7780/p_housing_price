import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:string;
  error?:string;
  hint?:string;
  leftIcon?:ReactNode;
  rightIcon?:ReactNode;
  fieldSize?:InputSize;
  required?:boolean;
  fullWidth?:boolean;
}

const sizeStyles: Record<InputSize, string> = {
  'sm':"px-3 py-1.5 text-sm",
  'md':"px-4 py-2 text-base",
  'lg':"px-4 py-3 text-lg",
};

export const Input = 
  ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fieldSize= "md",
    required= false,
    fullWidth= true,
    className= "",
    id,
    ...props
    }: InputProps
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const baseStyles = ` rounded-md border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`;

    const stateStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500";

    const widthStyle= fullWidth ? "w-full" : "";
    const paddingLeft = leftIcon  ? "pl-10"  : "";
    const paddingRight= rightIcon ? "pr-10"  : "";

    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
        {label && 
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label} {required && (<span className="text-red-500 ml-1" aria-hidden="true"> * </span>)}
          </label>
        }

        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">{leftIcon}</div>}

          <input
            id={inputId}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={` ${baseStyles}  ${stateStyles} ${sizeStyles[fieldSize]} ${widthStyle} ${paddingLeft} ${paddingRight} ${className} `}
            onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">{rightIcon}</div>}
        </div>

        {error && <p id={errorId} role="alert" className="text-sm text-red-600">{error}</p>}
        {!error && hint && <p id={hintId} className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  };

Input.displayName = "Input";