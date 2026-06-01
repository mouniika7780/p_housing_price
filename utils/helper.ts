export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency",currency: "USD", maximumFractionDigits: 0}).format(price);
};


export const formatDate = (iso: string): string => {
  return new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric",hour:"2-digit",minute: "2-digit",}).format(new Date(iso));
};