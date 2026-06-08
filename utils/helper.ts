export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", { style: "currency",currency: "INR", maximumFractionDigits: 0}).format(price);
};


export const formatDate = (iso: string): string => {
  return new Intl.DateTimeFormat("en-IN", { month:"short", day:"numeric",hour:"2-digit",minute: "2-digit",}).format(new Date(iso));
};

