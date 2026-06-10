import ConferenceCard from "./ConferenceCard";
import EmptyState from "./EmptyState";

function ConferenceGrid({
  conferences,
  showScoreInfo,
  onScoreClick,
  getFitClass,
  onOpenDetails,
}) {
  if (conferences.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="conference-grid">
      {conferences.map((conference) => (
        <ConferenceCard
          key={conference.id}
          conference={conference}
          showScoreInfo={showScoreInfo}
          onScoreClick={onScoreClick}
          getFitClass={getFitClass}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}

export default ConferenceGrid;