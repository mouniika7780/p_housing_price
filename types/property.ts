export interface PropertyInput {
  square_footage: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  lot_size: number;
  distance_to_city_center: number;
  school_rating: number;
}

export interface PropertyOutput {
  predicted_price: number;
  input_data: PropertyInput;
  confidence: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  input: PropertyInput;
  result: PropertyOutput;
}

export interface CompareItem {
  id: string;
  label: string;
  input: PropertyInput;
  result: PropertyOutput;
}