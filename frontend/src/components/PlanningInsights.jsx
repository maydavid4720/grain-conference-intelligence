function PlanningInsights({ conferences }) {
  const activeConferences = conferences.filter(
    (conference) => conference.status !== "past",
  );

  const sortedByScore = [...activeConferences].sort(
    (a, b) => b.icp_score - a.icp_score,
  );

  const topConference = sortedByScore[0];

  const europeUpcoming = activeConferences.filter(
    (conference) => conference.region === "Europe",
  );

  const asiaConferences = conferences.filter(
    (conference) => conference.region === "Asia",
  );

  const upcomingDates = [...activeConferences].sort(
    (a, b) => new Date(a.conference_date) - new Date(b.conference_date),
  );

  const firstUpcoming = upcomingDates[0];
  const lastUpcoming = upcomingDates[upcomingDates.length - 1];

  function formatShortDate(dateValue) {
    if (!dateValue) return "-";

    return new Date(dateValue).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="planning-insights-section">
      <div className="planning-insights-header">
        <p className="eyebrow">Planning Insights</p>
        <h3>Conference planning signals</h3>
        <p>
          Strategic recommendations for prioritization, regional coverage, and
          travel planning.
        </p>
      </div>

      <div className="planning-insights">
        <article className="insight-card">
          <span className="insight-label">Top ICP Opportunity</span>

          <h3>{topConference?.name || "No conference data"}</h3>

          <p>
            Highest alignment with Grain’s fintech, payments, treasury, and FX
            exposure ICP
            {topConference ? ` with an ICP score of ${topConference.icp_score}.` : "."}
          </p>
        </article>

        <article className="insight-card">
          <span className="insight-label">Travel Cluster</span>

          <h3>Europe conference window</h3>

          <p>
            {europeUpcoming.length} active European conference(s) are tracked
            between {formatShortDate(firstUpcoming?.conference_date)} and{" "}
            {formatShortDate(lastUpcoming?.conference_date)}, helping the team
            plan regional coverage and trip consolidation.
          </p>
        </article>

        <article className="insight-card">
          <span className="insight-label">Coverage Gap</span>

          <h3>APAC fintech ecosystem</h3>

          <p>
            Only {asiaConferences.length} APAC conference(s) are currently
            tracked, which may indicate an under-invested region for PSP and
            cross-border payments opportunities.
          </p>
        </article>
      </div>
    </div>
  );
}

export default PlanningInsights;