import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

function AllLeadsPage({ onBack, onViewLeadDetails }) {
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await apiClient.get("/leads/");
        setLeads(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingLeads(false);
      }
    }

    fetchLeads();
  }, []);

  const groupedContacts = Object.values(
    leads.reduce((groups, lead) => {
      const key = `${lead.full_name}-${lead.company}`;

      if (!groups[key]) {
        groups[key] = {
          full_name: lead.full_name,
          company: lead.company,
          job_title: lead.job_title,
          interactions: [],
        };
      }

      groups[key].interactions.push(lead);
      return groups;
    }, {})
  );

  return (
    <div className="all-leads-page">
      <button className="back-link-button" type="button" onClick={onBack}>
        ← Back to dashboard
      </button>

      <section className="dashboard-section">
        <div className="contacts-page-header">
          <div>
            <p className="eyebrow">Contacts Hub</p>
            <h2>All Contacts</h2>
            <p className="details-description">
              Review captured leads, follow-up status, and cross-conference
              relationship signals.
            </p>
          </div>
        </div>

        {isLoadingLeads && <p className="muted-text">Loading contacts...</p>}

        {!isLoadingLeads && groupedContacts.length === 0 && (
          <div className="small-empty-state">
            No contacts captured yet. Use Capture Lead to add your first
            conference interaction.
          </div>
        )}

        {!isLoadingLeads && groupedContacts.length > 0 && (
          <div className="contacts-grid">
            {groupedContacts.map((contact) => {
              const lastInteraction =
                contact.interactions[contact.interactions.length - 1];

              const hasHighInterest = contact.interactions.some(
                (item) => item.interest_level === "High"
              );

              const hasFollowUpNeeded = contact.interactions.some(
                (item) => item.follow_up_needed
              );

              const isRepeatContact = contact.interactions.length > 1;

              return (
                <article className="contact-card" key={`${contact.full_name}-${contact.company}`}>
                  <div className="contact-card-header">
                    <div>
                      <h3>{contact.full_name}</h3>
                      <p>
                        {contact.job_title || "Role not specified"} @{" "}
                        {contact.company}
                      </p>
                    </div>
                  </div>

                  <div className="lead-badges">
                    <span className="lead-interest-badge">
                      {hasHighInterest ? "High Interest" : "Active Contact"}
                    </span>

                    {isRepeatContact && (
                      <span className="follow-up-badge follow-needed">
                        Repeat contact
                      </span>
                    )}

                    <span
                      className={`follow-up-badge ${
                        hasFollowUpNeeded
                          ? "follow-needed"
                          : "follow-not-needed"
                      }`}
                    >
                      {hasFollowUpNeeded
                        ? "Follow-up needed"
                        : "No follow-up needed"}
                    </span>
                  </div>

                  <div className="contact-card-meta">
                    <span>{contact.interactions.length} interaction(s)</span>
                    <span>Last seen: {lastInteraction.conference_name}</span>
                  </div>

                  <button
                    className="view-details-button"
                    type="button"
                    onClick={() => onViewLeadDetails(lastInteraction)}
                  >
                    View Lead Intelligence →
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default AllLeadsPage;