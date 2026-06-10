from sqlalchemy.orm import Session
from app.models import Conference
from datetime import date

def seed_conferences(db: Session):
    existing_count = db.query(Conference).count()

    if existing_count > 0:
        return

    conferences = [
        Conference(
            name="Money20/20 Europe",
            location="Amsterdam, Netherlands",
            region="Europe",
            vertical="Payments / Fintech",
            conference_date=date(2026, 6, 12),
            audience_size=8000,
            estimated_cost_level="High",
            industry_relevance=10,
            audience_quality=10,
            geographic_fit=9,
            audience_size_score=8,
            strategic_value=9,
            description="High-fit payments and fintech conference with strong PSP, treasury and financial infrastructure audience."
        ),
        Conference(
            name="Money20/20 USA",
            location="Las Vegas, USA",
            region="North America",
            vertical="Payments / Fintech",
            conference_date=date(2026, 10, 26),
            audience_size=11000,
            estimated_cost_level="High",
            industry_relevance=10,
            audience_quality=10,
            geographic_fit=9,
            audience_size_score=9,
            strategic_value=8,
            description="Major fintech and payments event with strong relevance to PSPs, cross-border payments and FX exposure."
        ),
        Conference(
            name="Singapore FinTech Festival",
            location="Singapore",
            region="Asia",
            vertical="Fintech / Banking",
            conference_date=date(2026, 11, 11),
            audience_size=60000,
            estimated_cost_level="High",
            industry_relevance=9,
            audience_quality=9,
            geographic_fit=8,
            audience_size_score=10,
            strategic_value=8,
            description="Large global fintech event with strong representation from banks, payment companies and financial institutions."
        ),
        Conference(
            name="Seamless Middle East",
            location="Dubai, UAE",
            region="Middle East",
            vertical="Payments / Commerce",
            conference_date=date(2026, 5, 20),
            audience_size=20000,
            estimated_cost_level="Medium",
            industry_relevance=8,
            audience_quality=8,
            geographic_fit=8,
            audience_size_score=9,
            strategic_value=7,
            description="Relevant event for payments, fintech, ecommerce and digital commerce companies in the Middle East."
        ),
        Conference(
            name="ITB Berlin",
            location="Berlin, Germany",
            region="Europe",
            vertical="Travel",
            conference_date=date(2026, 3, 3),
            audience_size=100000,
            estimated_cost_level="Medium",
            industry_relevance=7,
            audience_quality=8,
            geographic_fit=8,
            audience_size_score=10,
            strategic_value=8,
            description="Large travel industry event, relevant for travel wholesalers and companies with FX exposure."
        ),
        Conference(
            name="Web Summit",
            location="Lisbon, Portugal",
            region="Europe",
            vertical="SaaS / Startups",
            conference_date=date(2026, 11, 9),
            audience_size=70000,
            estimated_cost_level="Medium",
            industry_relevance=6,
            audience_quality=7,
            geographic_fit=7,
            audience_size_score=10,
            strategic_value=6,
            description="Broad technology conference with some fintech and SaaS relevance, but less focused than payments-specific events."
        ),
        Conference(
            name="SaaStr Annual",
            location="San Francisco Bay Area, USA",
            region="North America",
            vertical="SaaS",
            conference_date=date(2026, 9, 10),
            audience_size=12000,
            estimated_cost_level="Medium",
            industry_relevance=5,
            audience_quality=7,
            geographic_fit=7,
            audience_size_score=8,
            strategic_value=5,
            description="Strong SaaS audience, useful for partnerships but less directly aligned with PSP and FX exposure ICP."
        ),
        Conference(
            name="London Fintech Week",
            location="London, UK",
            region="Europe",
            vertical="Fintech",
            conference_date=date(2026, 6, 23),
            audience_size=5000,
            estimated_cost_level="Low",
            industry_relevance=9,
            audience_quality=8,
            geographic_fit=9,
            audience_size_score=7,
            strategic_value=8,
            description="Fintech-focused event in a strong financial hub, relevant for payments, treasury and FX decision-makers."
        ),
    ]

    db.add_all(conferences)
    db.commit()