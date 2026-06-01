from fastapi import APIRouter, HTTPException
from schemas import propertyInput,propertyOutput
import numpy as np
import os
from models import HousingModel

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "trainedModels", "housing_price_model.pkl")


try:
    housing_model = HousingModel.load(MODEL_PATH)
    scaler = housing_model.scaler
    print(f" Model loaded from: {MODEL_PATH},{housing_model}")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")



@router.post("/predict", response_model=propertyOutput)
async def predict_price(property: propertyInput):
    try:
        features = np.array([[
            property.square_footage,
            property.bedrooms,
            property.bathrooms,
            property.year_built,
            property.lot_size,
            property.distance_to_city_center,
            property.school_rating
        ]])
        features_scaled = scaler.transform(features)
        prediction = housing_model.predict(features_scaled)[0]
        return propertyOutput(
            predicted_price=round(float(prediction), 2),
            input_data=property,
            confidence="high" if prediction > 0 else "low"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "ok", "model": "loaded"}