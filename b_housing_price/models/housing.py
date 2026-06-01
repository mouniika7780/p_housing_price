import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import pickle
import os

class HousingModel:
    def __init__(self):
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        self.feature_names = ["square_footage", "bedrooms", "bathrooms","year_built", "lot_size","distance_to_city_center", "school_rating"]
        self.metrics = {}
        self.is_trained = False

    def predict(self, features: list) -> list:
        df = pd.DataFrame(features, columns=self.feature_names)
        scaled = self.scaler.transform(df)
        predictions = self.model.predict(scaled)
        return [round(float(p), 2) for p in predictions]

    def save(self, path: str = "trainedModels/housing_price_model.pkl"):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            pickle.dump(self, f)

    @staticmethod
    def load(path: str = "trainedModels/housing_price_model.pkl"):
        with open(path, "rb") as f:
            return pickle.load(f)