from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Conference
from app.schemas import ConferenceResponse

router = APIRouter(
    prefix="/conferences",
    tags=["Conferences"]
)


@router.get("/", response_model=List[ConferenceResponse])
def get_conferences(db: Session = Depends(get_db)):
    conferences = db.query(Conference).all()
    return sorted(conferences, key=lambda conference: conference.icp_score, reverse=True)

@router.get("/{conference_id}", response_model=ConferenceResponse)
def get_conference_by_id(conference_id: int, db: Session = Depends(get_db)):
    conference = db.query(Conference).filter(Conference.id == conference_id).first()

    if not conference:
        raise HTTPException(status_code=404, detail="Conference not found")

    return conference