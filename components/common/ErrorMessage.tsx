import { ReactNode } from "react";
import { AlertCircle,X } from "lucide-react";
import { Button } from "./Button";

type ErrorVariant = "inline" | "banner" | "toast";

interface ErrorMessageProps {
  message: string | ReactNode;
  variant?:ErrorVariant;
  onClose?:() => void;
  className?:string;
}

const variantStyles: Record<ErrorVariant, string> = {
  inline:"text-sm text-red-600",
  banner:"w-full flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm",
  toast:"flex items-start gap-3 bg-red-600 text-white rounded-lg px-4 py-3 text-sm shadow-lg",
};

const ErrorIcon = () => (<AlertCircle size={20} className="shrink-0 mt-0.5" aria-hidden="true" />);
const CloseButton = ({ onClose }: { onClose: () => void }) => (<Button variant="transparent" size="sm" onClick={onClose} aria-label="Dismiss error" className="ml-auto shrink-0" leftIcon={<X size={16} aria-hidden="true" />}
><></></Button>);

export const ErrorMessage = ({message,variant = "inline",onClose,className = "",}: ErrorMessageProps) => {
  if (!message) return null;

  if (variant === "inline") {
    return (<p role="alert" aria-live="polite" className={`${variantStyles.inline}${className}`}>{message}</p>);
  }

  if (variant === "banner") {
    return (
      <div role="alert" aria-live="assertive"     className={`${variantStyles.banner} ${className}`}>
        <ErrorIcon />
        <p className="flex-1">{message}</p>
        {onClose && <CloseButton onClose={onClose} />}
      </div>
    );
  }

  return (
    <div  role="alert" aria-live="assertive" className={`${variantStyles.toast} ${className}`} >
      <ErrorIcon />
      <p className="flex-1">{message}</p>
      {onClose && <CloseButton onClose={onClose} />}
    </div>
  );
};