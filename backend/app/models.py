from datetime import date, timedelta
from sqlalchemy import Column, Integer, String, Boolean, Date
from app.database import Base


class Conference(Base):
    __tablename__ = "conferences"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    region = Column(String, nullable=False)
    vertical = Column(String, nullable=False)
    conference_date = Column(Date, nullable=False)
    audience_size = Column(Integer)
    estimated_cost_level = Column(String)

    industry_relevance = Column(Integer, nullable=False)
    audience_quality = Column(Integer, nullable=False)
    geographic_fit = Column(Integer, nullable=False)
    audience_size_score = Column(Integer, nullable=False)
    strategic_value = Column(Integer, nullable=False)

    description = Column(String)

    @property
    def icp_score(self):
        score = (
            self.industry_relevance * 0.40 +
            self.audience_quality * 0.30 +
            self.geographic_fit * 0.15 +
            self.audience_size_score * 0.10 +
            self.strategic_value * 0.05
        )
        return round(score * 10)

    @property
    def fit_label(self):
        if self.icp_score >= 85:
            return "High Fit"
        if self.icp_score >= 70:
            return "Medium Fit"
        return "Low Fit"
    
    @property
    def status(self):
        today = date.today()

        if self.conference_date < today:
            return "past"

        if today <= self.conference_date <= today + timedelta(days=7):
            return "live"

        return "upcoming"

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)
    company = Column(String, nullable=False)
    job_title = Column(String, nullable=True)

    conference_id = Column(Integer, nullable=False)
    conference_name = Column(String, nullable=False)
    interest_level = Column(String, nullable=False)

    notes = Column(String, nullable=True)

    follow_up_needed = Column(Boolean, default=True)
    