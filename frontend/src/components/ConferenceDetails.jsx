import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

function ConferenceDetails({
  conference,
  onBack,
  onCaptureLeadClick,
  onViewLeadDetails,
}) {
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  useEffect(() => {
    async function fetchLeadsForConference() {
      try {
        const response = await apiClient.get(
          `/leads/conference/${conference.id}`,
        );
        setLeads(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingLeads(false);
      }
    }

    fetchLeadsForConference();
  }, [conference.id]);

  return (
    <div className="conference-details-page">
      <button className="back-link-button" type="button" onClick={onBack}>
        ← Back to dashboard
      </button>

      <section className="dashboard-section conference-details-section">
        <div className="conference-details-top">
          <div>
            <p className="eyebrow">Conference Details</p>
            <h2>{conference.name}</h2>
            <p className="details-description">{conference.description}</p>
          </div>

          <span className={`status-badge ${conference.status}`}>
            {conference.status}
          </span>
        </div>

        <div className="details-summary-grid">
          <div className="summary-card">
            <span>ICP Score</span>
            <strong>{conference.icp_score}</strong>
          </div>

          <div className="summary-card">
            <span>Fit</span>
            <strong>{conference.fit_label}</strong>
          </div>

          <div className="summary-card">
            <span>Audience</span>
            <strong>{conference.audience_size?.toLocaleString()}</strong>
          </div>

          <div className="summary-card">
            <span>Date</span>
            <strong>
              {new Date(conference.conference_date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </strong>
          </div>
        </div>

        <div className="conference-details-grid">
          <div className="details-card">
            <h3>Conference information</h3>

            <div className="details-list">
              <p>
                <strong>Location:</strong> {conference.location}
              </p>
              <p>
                <strong>Region:</strong> {conference.region}
              </p>
              <p>
                <strong>Vertical:</strong> {conference.vertical}
              </p>
              <p>
                <strong>Status:</strong> {conference.status}
              </p>
            </div>
          </div>

          <div className="details-card quick-actions-card">
            <h3>Quick actions</h3>
            <p className="muted-text">
              Capture new conversations or review who was already met at this
              conference.
            </p>

            <div className="quick-actions">
              <button
                className="primary-button"
                type="button"
                onClick={onCaptureLeadClick}
              >
                + Capture Lead
              </button>
            </div>
          </div>
        </div>

        <div className="details-card contacts-met-section">
          <div className="contacts-section-header">
            <div>
              <h3>Contacts met here</h3>
              <p className="muted-text">
                Leads captured for this conference and their current follow-up
                status.
              </p>
            </div>

            <span className="contacts-count">{leads.length} contact(s)</span>
          </div>

          {isLoadingLeads && <p>Loading leads...</p>}

          {!isLoadingLeads && leads.length === 0 && (
            <div className="small-empty-state">
              No leads captured for this conference yet.
            </div>
          )}

          {!isLoadingLeads && leads.length > 0 && (
            <div className="leads-table">
              {leads.map((lead) => (
                <div className="lead-card" key={lead.id}>
                  <div className="lead-card-header">
                    <div>
                      <strong>{lead.full_name}</strong>

                      <p className="lead-company">
                        {lead.job_title || "Role not specified"} @{" "}
                        {lead.company}
                      </p>
                    </div>

                    <button
                      className="view-contact-button"
                      type="button"
                      onClick={() => onViewLeadDetails(lead)}
                    >
                      View Contact →
                    </button>
                  </div>

                  <div className="lead-badges">
                    <span className="lead-interest-badge">
                      {lead.interest_level} Interest
                    </span>

                    <span
                      className={`follow-up-badge ${
                        lead.follow_up_needed
                          ? "follow-needed"
                          : "follow-not-needed"
                      }`}
                    >
                      {lead.follow_up_needed
                        ? "Follow-up needed"
                        : "No follow-up needed"}
                    </span>
                  </div>

                  {lead.notes && (
                    <div className="lead-notes">
                      <strong>Notes</strong>
                      <p>{lead.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ConferenceDetails;
