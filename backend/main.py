"""Vercel entrypoint re-exporting FastAPI app."""
from app.main import app

__all__ = ["app"]

