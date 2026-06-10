from pydantic import BaseModel
from typing import Optional
from datetime import date


class ConferenceResponse(BaseModel):
    id: int
    name: str
    location: str
    region: str
    vertical: str
    status: str
    conference_date: date
    audience_size: Optional[int] = None
    estimated_cost_level: Optional[str] = None

    industry_relevance: int
    audience_quality: int
    geographic_fit: int
    audience_size_score: int
    strategic_value: int

    icp_score: int
    fit_label: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

class LeadCreate(BaseModel):
    full_name: str
    company: str
    job_title: str | None = None

    conference_id: int
    conference_name: str

    interest_level: str

    notes: str | None = None

    follow_up_needed: bool = True


class LeadResponse(LeadCreate):
    id: int

    class Config:
        from_attributes = True

class LeadPlaybookRequest(BaseModel):
    lead: dict
    history: list[dict]


class LeadPlaybookResponse(BaseModel):
    buying_intent: str
    relationship_diagnosis: str
    recommended_next_action: str
    follow_up_email: str