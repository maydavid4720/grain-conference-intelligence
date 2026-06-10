function ConferenceCard({
  conference,
  showScoreInfo,
  onScoreClick,
  getFitClass,
  onOpenDetails,
}) {
  return (
    <article
      className="conference-card"
      onClick={() => onOpenDetails(conference)}
    >
      <div className="card-top-row">
        <span className={`status-badge ${conference.status}`}>
          {conference.status}
        </span>

        <div className="score-wrapper">
          <button
            className="score-button"
            onClick={(event) => {
              event.stopPropagation();
              onScoreClick(conference.id);
            }}
            type="button"
          >
            ICP Score: {conference.icp_score}
          </button>

          <span className={`fit-label ${getFitClass(conference.fit_label)}`}>
            {conference.fit_label}
          </span>

          {showScoreInfo === conference.id && (
            <div className="score-tooltip">
              ICP Score measures how strongly this conference matches Grain’s
              ideal customer profile.
            </div>
          )}
        </div>
      </div>

      <h3>{conference.name}</h3>
      <p>{conference.description}</p>

      <div className="card-meta">
        <span>
          Date: {new Date(conference.conference_date).toLocaleDateString()}
        </span>
        <span>{conference.location}</span>
        <span>{conference.vertical}</span>
        <span>{conference.audience_size?.toLocaleString()} attendees</span>
        <span>Estimated cost: {conference.estimated_cost_level}</span>
      </div>

      <button
        className="view-details-button"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpenDetails(conference);
        }}
      >
        View details →
      </button>
    </article>
  );
}

export default ConferenceCard;
