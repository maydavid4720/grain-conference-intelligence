import json
import os

import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import APIRouter

from app.schemas import LeadPlaybookRequest, LeadPlaybookResponse

load_dotenv()

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


def build_lead_playbook_prompt(lead: dict, history: list[dict]) -> str:
    return f"""
You are an AI sales strategist for Grain, a company that helps PSPs, travel wholesalers,
cross-border payment companies, and businesses with FX exposure manage currency risk.

Analyze this lead based on their conference interaction history.

Lead:
{json.dumps(lead, indent=2)}

Conference interaction history:
{json.dumps(history, indent=2)}

Return ONLY valid JSON with this structure:
{{
  "buying_intent": "Low | Warm | Hot | Tire-kicker",
  "relationship_diagnosis": "Short practical explanation of the relationship status.",
  "recommended_next_action": "Specific sales action the rep should take next.",
  "follow_up_email": "A short personalized follow-up email draft."
}}

Guidelines:
- Be practical and sales-oriented.
- Use the timeline to detect whether the relationship is warming up or stalling.
- If interest increased across conferences, mention that.
- If follow-up is needed, recommend a clear next step.
- Keep the answer concise and useful for a busy sales rep.
"""


def fallback_playbook(lead: dict, history: list[dict]) -> dict:
    has_high_interest = any(item.get("interest_level") == "High" for item in history)
    repeat_contact = len(history) > 1

    if has_high_interest and repeat_contact:
        intent = "Warm"
        diagnosis = "This contact has appeared across multiple conference interactions and showed high interest, suggesting a warming relationship."
        next_action = "Send a personalized follow-up referencing the latest conference and offer a short FX-risk discovery call."
    elif has_high_interest:
        intent = "Warm"
        diagnosis = "This contact showed high interest in the latest interaction, but more relationship history is needed."
        next_action = "Follow up quickly while the conversation is still fresh."
    else:
        intent = "Low"
        diagnosis = "This contact has limited buying signals based on the current history."
        next_action = "Send a light follow-up and monitor for stronger engagement."

    name = lead.get("full_name", "there")
    company = lead.get("company", "your company")

    return {
        "buying_intent": intent,
        "relationship_diagnosis": diagnosis,
        "recommended_next_action": next_action,
        "follow_up_email": f"Hi {name},\n\nGreat speaking with you. Based on our conversation, I thought it could be useful to show how Grain helps companies like {company} manage FX exposure and currency risk.\n\nWould you be open to a short call next week?\n\nBest,"
    }


@router.post("/lead-playbook", response_model=LeadPlaybookResponse)
def generate_lead_playbook(request: LeadPlaybookRequest):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return fallback_playbook(request.lead, request.history)

    try:
        genai.configure(api_key=api_key)

        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = build_lead_playbook_prompt(request.lead, request.history)

        response = model.generate_content(prompt)

        raw_text = response.text.strip()

        if raw_text.startswith("```json"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text.replace("```", "").strip()

        return json.loads(raw_text)

    except Exception as error:
        print("Gemini error:", error)
        return fallback_playbook(request.lead, request.history)