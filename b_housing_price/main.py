from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict_router

app = FastAPI(
    title="Housing Price Estimator API",
    description="Predict housing prices",
    version="1.0.0"
)

# CORS — allow from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api/v1", tags=["Prediction"])

