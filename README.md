# Grain Conference Intelligence Tool

AI-powered conference planning and lead intelligence platform built for Grain’s sales team.

This tool helps sales representatives prioritize conferences, capture leads quickly during live events, track relationships across multiple conferences, and generate AI-assisted sales recommendations and follow-up actions.

---

# Live Demo

## Frontend

[Live Application](https://grain-conference-intelligence-alpha.vercel.app)

## Backend API

[API Documentation](https://grain-conference-intelligence.onrender.com/docs)

---

# Problem Statement

Grain’s sales organization relies heavily on conferences for pipeline generation across fintech, payments, treasury, and travel industries.

Traditionally, conference planning and lead tracking are fragmented across spreadsheets, notes, and Slack messages.

This project centralizes that workflow into a single intelligent platform that helps sales teams:

* Prioritize conferences by ICP fit
* Plan yearly conference coverage
* Capture leads quickly during events
* Track repeat interactions across conferences
* Generate AI-assisted sales recommendations
* Prepare CRM-ready follow-up context

---

# Core Features

## Conference Intelligence Dashboard

* Conference list with filtering
* ICP scoring and fit tiers
* Dynamic conference status:

  * Live
  * Upcoming
  * Past
* Conference planning insights
* Regional clustering analysis
* Coverage gap detection

---

## ICP Scoring System

Each conference receives an ICP score based on multiple weighted business factors:

* Industry relevance
* Audience quality
* Geographic fit
* Strategic value
* Audience size
* Cost efficiency

Conferences are automatically categorized into:

* High Fit
* Medium Fit
* Low Fit

---

## Planning Insights Engine

The dashboard surfaces strategic planning recommendations such as:

* Highest ICP opportunities
* Regional conference clustering
* Under-invested geographic regions
* Conference timing overlap opportunities

This helps sales teams optimize travel planning and resource allocation.

---

## Lead Capture Workflow

Built specifically for fast-paced conference environments.

Sales representatives can quickly capture:

* Contact name
* Company
* Role
* Conference
* Interest level
* Notes
* Follow-up requirements

The interface prioritizes speed and low friction over excessive data entry.

---

## Cross-Conference Relationship Tracking

The system identifies repeat contacts across multiple conferences and builds a relationship timeline.

It helps sales reps distinguish between:

* Warm, progressing relationships
* Passive or low-intent repeat contacts

The timeline view includes:

* Interaction history
* Follow-up status
* Conference history
* Notes and engagement patterns

---

# AI Sales Playbook

The platform includes an AI-powered sales intelligence feature using Google Gemini.

For each contact, the AI generates:

* Buying intent analysis
* Relationship diagnosis
* Recommended next action
* Personalized follow-up email draft

The AI feature is intentionally designed to support sales decision-making rather than fully automate it.

---

# HubSpot Integration Path

The project includes a CRM sync flow demonstrating how lead data and AI-generated context can be pushed into HubSpot.

Current implementation:

* Simulated sync flow
* CRM-ready payload structure
* Extensible integration point for production use

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

## AI

* Google Gemini API

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# Project Structure

```text
grain-conference-intelligence/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Local Development Setup

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

```env
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./grain_conference.db
```

---

## Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

# AI Development Workflow

AI-assisted development tools were intentionally used throughout the project, including:

* ChatGPT
* Gemini
* AI-assisted UI iteration
* Prompt engineering
* Architecture refinement
* UX brainstorming

The goal was not only to build the tool, but also to demonstrate practical AI collaboration during product development.

---

# Future Improvements

If given additional development time, planned improvements would include:

* Real HubSpot integration
* Authentication and multi-user support
* Persistent cloud database
* Better AI scoring calibration
* Duplicate contact resolution
* OCR business card scanning
* Conference discovery recommendations
* Advanced analytics dashboard

---

# Author

Created by May David as part of a technical home assignment for Grain AI Builder.