from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, SessionLocal
from app.models import Conference
from app.seed_data import seed_conferences
from app.routers import conferences
from app.routers import leads , ai 

Base.metadata.create_all(bind=engine)

db = SessionLocal()
seed_conferences(db)
db.close()

app = FastAPI(title="Grain Conference Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "https://grain-conference-intelligence-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conferences.router)
app.include_router(leads.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "Grain Conference Intelligence API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
