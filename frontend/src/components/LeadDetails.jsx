import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

function LeadDetails({ lead, onBack }) {
  const [contactHistory, setContactHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [aiPlaybook, setAiPlaybook] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [hubSpotMessage, setHubSpotMessage] = useState("");

  useEffect(() => {
    async function fetchContactHistory() {
      try {
        const response = await apiClient.get(
          `/leads/contact/${encodeURIComponent(lead.full_name)}/${encodeURIComponent(
            lead.company,
          )}`,
        );

        setContactHistory(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    fetchContactHistory();
  }, [lead.full_name, lead.company]);

  const relationshipStatus =
    contactHistory.length > 1 ? "Repeat contact" : "First interaction";

  const relationshipDescription =
    contactHistory.length > 1
      ? `This contact has been captured across ${contactHistory.length} conference interactions.`
      : "This is the first recorded interaction with this contact.";

  const lastInteraction = contactHistory[contactHistory.length - 1] || lead;

  const strongestInterest = contactHistory.some(
    (item) => item.interest_level === "High",
  )
    ? "High"
    : contactHistory.some((item) => item.interest_level === "Medium")
      ? "Medium"
      : "Low";

  const hasFollowUpNeeded = contactHistory.some(
    (item) => item.follow_up_needed,
  );

  async function generateAIPlaybook() {
    setIsGeneratingAI(true);
    setAiError("");

    try {
      const response = await apiClient.post("/ai/lead-playbook", {
        lead,
        history: contactHistory,
      });

      setAiPlaybook(response.data);
    } catch (error) {
      console.error(error);
      setAiError("Failed to generate AI playbook. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  }

  function pushToHubSpot() {
    setHubSpotMessage("HubSpot sync simulated successfully.");
  }

  return (
    <div className="lead-details-page">
      <button className="back-link-button" type="button" onClick={onBack}>
        ← Back
      </button>

      <section className="dashboard-section lead-details-section">
        <div className="lead-details-top">
          <div>
            <p className="eyebrow">Lead Details</p>
            <h2>{lead.full_name}</h2>
            <p className="details-description">
              {lead.job_title || "Role not specified"} @ {lead.company}
            </p>
          </div>

          <span className="lead-interest-badge">{relationshipStatus}</span>
        </div>

        <div className="details-summary-grid">
          <div className="summary-card">
            <span>Company</span>
            <strong>{lead.company}</strong>
          </div>

          <div className="summary-card">
            <span>Interactions</span>
            <strong>{contactHistory.length || 1}</strong>
          </div>

          <div className="summary-card">
            <span>Last seen</span>
            <strong>{lastInteraction.conference_name}</strong>
          </div>

          <div className="summary-card">
            <span>Follow-up</span>
            <strong>{hasFollowUpNeeded ? "Needed" : "Not needed"}</strong>
          </div>
        </div>

        <div className="details-card contacts-met-section">
          <div className="contacts-section-header">
            <div>
              <h3>Relationship timeline</h3>
              <p className="muted-text">
                Cross-conference history for this contact.
              </p>
            </div>
          </div>

          <p className="relationship-description">{relationshipDescription}</p>

          {isLoadingHistory && <p>Loading relationship history...</p>}

          {!isLoadingHistory && (
            <div className="relationship-timeline-grid">
              {contactHistory.map((item) => (
                <div className="timeline-card" key={item.id}>
                  <div className="timeline-card-header">
                    <strong>{item.conference_name}</strong>
                  </div>

                  <div className="lead-badges">
                    <span className="lead-interest-badge">
                      {item.interest_level} Interest
                    </span>

                    <span
                      className={`follow-up-badge ${
                        item.follow_up_needed
                          ? "follow-needed"
                          : "follow-not-needed"
                      }`}
                    >
                      {item.follow_up_needed
                        ? "Follow-up needed"
                        : "No follow-up needed"}
                    </span>
                  </div>

                  {item.notes && (
                    <div className="timeline-notes">
                      <span>Notes</span>
                      <p>{item.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="details-card ai-playbook-section">
          <div className="contacts-section-header">
            <div>
              <h3>AI Sales Playbook</h3>
              <p className="muted-text">
                Generate a sales recommendation from this contact’s conference
                history, interest level, notes, and follow-up status.
              </p>
            </div>
          </div>

          <div className="ai-playbook-empty">
            <p>
              Use AI to turn relationship history into buying intent,
              recommended next action, and a personalized follow-up draft.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={generateAIPlaybook}
              disabled={isGeneratingAI || contactHistory.length === 0}
            >
              {isGeneratingAI ? "Generating..." : "Generate AI Playbook"}
            </button>

            {aiError && <p className="error-message">{aiError}</p>}
          </div>

          {aiPlaybook && (
            <div className="ai-playbook-results">
              <div className="ai-result-card">
                <span>Buying Intent</span>
                <strong>{aiPlaybook.buying_intent}</strong>
              </div>

              <div className="ai-result-card">
                <span>Relationship Diagnosis</span>
                <p>{aiPlaybook.relationship_diagnosis}</p>
              </div>

              <div className="ai-result-card">
                <span>Recommended Next Action</span>
                <p>{aiPlaybook.recommended_next_action}</p>
              </div>

              <div className="ai-result-card ai-email-card">
                <span>Follow-up Draft</span>
                <p>{aiPlaybook.follow_up_email}</p>
              </div>

              <div className="ai-result-card ai-hubspot-card">
                <span>HubSpot Sync</span>
                <p>
                  Push this contact and AI-generated sales context into HubSpot
                  for follow-up.
                </p>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={pushToHubSpot}
                >
                  Push to HubSpot
                </button>

                {hubSpotMessage && (
                  <p className="success-message">{hubSpotMessage}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default LeadDetails;
