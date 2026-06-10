from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Lead
from app.schemas import LeadCreate, LeadResponse

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)

@router.get("/conference/{conference_id}", response_model=list[LeadResponse])
def get_leads_by_conference(conference_id: int, db: Session = Depends(get_db)):
    return db.query(Lead).filter(Lead.conference_id == conference_id).all()

@router.get("/contact/{full_name}/{company}", response_model=list[LeadResponse])
def get_leads_by_contact(
    full_name: str,
    company: str,
    db: Session = Depends(get_db)
):
    return (
        db.query(Lead)
        .filter(Lead.full_name == full_name)
        .filter(Lead.company == company)
        .all()
    )

@router.post("/", response_model=LeadResponse)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    new_lead = Lead(**lead.model_dump())

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    return new_lead

@router.get("/", response_model=list[LeadResponse])
def get_leads(db: Session = Depends(get_db)):
    return db.query(Lead).all()