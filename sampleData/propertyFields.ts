
export const PROPERTY_FIELDS = [
  {
    name:"square_footage",
    label:"Square Footage",
    type: "number",
    placeholder: "e.g. 1500",
    hint: "Total area in square feet",
    validation: {
      required: "Square footage is required",
      min:{ value: 1,    message: "Must be greater than 0" },
      max:{ value: 100000, message: "Value seems too large"},
    },
  },
  {
    name: "year_built",
    label:"Year Built",
    type: "number",
    placeholder: "e.g. 2005",
    hint: "Year the property was constructed",
    validation: {
      required: "Year built is required",
      min:{ value: 1800,message: "Year must be after 1800"},
      max:{ value: new Date().getFullYear(),  message: "Year cannot be in the future"  },
    },
  },
  {
    name: "bedrooms",
    label:"Bedrooms",
    type: "number",
    placeholder: "e.g. 3",
    hint: "Number of bedrooms",
    validation: {
      required: "Bedrooms is required",
      min:{ value: 1,message: "Must have at least 1 bedroom"},
      max:{ value: 20, message: "Value seems too large" },
    },
  },
  {
    name: "bathrooms",
    label:"Bathrooms",
    type: "number",
    placeholder: "e.g. 2",
    hint: "Number of bathrooms",
    validation: {
      required: "Bathrooms is required",
      min:{ value: 1,message: "Must have at least 1 bathroom"},
      max:{ value: 20, message: "Value seems too large"},
    },
  },
  {
    name: "lot_size",
    label:"Lot Size",
    type: "number",
    placeholder: "e.g. 6000",
    hint: "Total lot area in square feet",
    validation: {
      required: "Lot size is required",
      min:{ value: 1,    message: "Must be greater than 0"},
      max:{ value: 500000, message: "Value seems too large"},
    },
  },
  {
    name: "distance_to_city_center",
    label:"Distance to City Center",
    type: "number",
    placeholder: "e.g. 5.2",
    hint: "Distance in kilometers",
    validation: {
      required: "Distance is required",
      min:{ value: 0, message: "Cannot be negative"},
      max:{ value: 500, message: "Value seems too large"},
    },
  },
  {
    name: "school_rating",
    label:"School Rating",
    type: "number",
    placeholder: "e.g. 7.5",
    hint: "Rating from 0 to 10",
    validation: {
      required: "School rating is required",
      min:{ value: 0,message: "Rating must be between 0 and 10"},
      max:{ value: 10, message: "Rating must be between 0 and 10"},
    },
  },
] 



export const TABLE_COLUMNS = [
  {key:"timestamp",label:"Date & Time"},
  {key:"square_footage",label:"Sq Ft"},
  {key:"bedrooms",label:"Beds" },
  {key:"bathrooms",label:"Baths"},
  {key:"year_built", label:"Year Built" },
  {key:"school_rating",label:"School" },
  {key:"predicted_price",label:"Predicted Price"},
  {key:"confidence",label:"Confidence" },
  {key:"actions",label:"" },
];

export const COMPARE_ROWS = [
  {key:"predicted_price",label:"Predicted Price"},
  {key:"square_footage", label:"Square Footage"},
  {key:"bedrooms",label:"Bedrooms"},
  {key:"bathrooms", label:"Bathrooms"},
  {key:"year_built",label:"Year Built"},
  {key:"lot_size", label:"Lot Size"},
  {key:"distance_to_city_center", label:"Distance to City"},
  {key:"school_rating",label:"School Rating"},
  {key:"confidence",label:"Confidence"},
];