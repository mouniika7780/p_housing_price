from pydantic import BaseModel, Field, field_validator

class propertyInput(BaseModel):
    square_footage: float = Field(..., gt=0, description="Square footage")
    bedrooms: int = Field(..., ge=1, le=20)
    bathrooms: int = Field(..., ge=1, le=3)
    year_built: int = Field(..., ge=1800, le=2025)
    lot_size: float = Field(..., gt=0)
    distance_to_city_center: float = Field(..., ge=0)
    school_rating: float = Field(..., ge=0, le=10)

    @field_validator('square_footage')
    def validate_sqft(cls, v):
        if v > 100000:
            raise ValueError('Square footage seems too large')
        return v

class propertyOutput(BaseModel):
    predicted_price: float
    input_data: propertyInput
    confidence: str