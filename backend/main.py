"""FastAPI application entry point for the Gardening Tracker backend."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Gardening Tracker")

# Allow comma-separated origins via env var for flexibility across environments
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    """Response model for the health check endpoint."""
    status: str


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Check that the API is running.

    Returns:
        HealthResponse: An object with status set to "ok".
    """
    return HealthResponse(status="ok")
