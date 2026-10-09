"""Resistance Route API: Phase 0 infrastructure checks."""

import os

import psycopg
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Resistance Route API", version="0.1.0")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "backend"}


@app.get("/api/health/db")
def health_db() -> dict[str, str]:
    url = os.environ.get("DATABASE_URL")
    if not url:
        raise HTTPException(status_code=503, detail="DATABASE_URL is not configured")
    try:
        with psycopg.connect(url, connect_timeout=3) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT PostGIS_Version()")
                version = cursor.fetchone()[0]
    except psycopg.Error:
        raise HTTPException(status_code=503, detail="Database is unavailable") from None
    return {"status": "ok", "database": "postgis", "postgis_version": version}

