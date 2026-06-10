import DashboardHeader from "./DashboardHeader";
import FilterBar from "./FilterBar";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import ConferenceGrid from "./ConferenceGrid";
import PlanningInsights from "./PlanningInsights";

function ConferenceDashboard({
  includePast,
  setIncludePast,
  regions,
  verticals,
  fitLevels,
  selectedRegions,
  setSelectedRegions,
  selectedVerticals,
  setSelectedVerticals,
  selectedFits,
  setSelectedFits,
  resetFilters,
  isLoading,
  errorMessage,
  filteredConferences,
  showScoreInfo,
  handleScoreClick,
  getFitClass,
  onCaptureLeadClick,
  onOpenConferenceDetails,
  onOpenAllLeads,
}) {
  return (
    <section className="dashboard-section">
      
      <PlanningInsights conferences={filteredConferences} />

      <DashboardHeader
        onCaptureLeadClick={onCaptureLeadClick}
        onOpenAllLeads={onOpenAllLeads}
      />
      
      <FilterBar
        includePast={includePast}
        setIncludePast={setIncludePast}
        regions={regions}
        verticals={verticals}
        fitLevels={fitLevels}
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
        selectedVerticals={selectedVerticals}
        setSelectedVerticals={setSelectedVerticals}
        selectedFits={selectedFits}
        setSelectedFits={setSelectedFits}
        resetFilters={resetFilters}
      />

      {isLoading && <LoadingState />}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <>
          {filteredConferences.length === 0 ? (
            <EmptyState />
          ) : (
            <ConferenceGrid
              conferences={filteredConferences}
              showScoreInfo={showScoreInfo}
              onScoreClick={handleScoreClick}
              getFitClass={getFitClass}
              onOpenDetails={onOpenConferenceDetails}
            />
          )}
        </>
      )}
    </section>
  );
}

export default ConferenceDashboard;
