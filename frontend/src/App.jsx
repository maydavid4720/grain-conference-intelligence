import { useEffect, useState } from "react";
import { apiClient } from "./api/client";
import "./App.css";
import FilterBar from "./components/FilterBar";
import ConferenceCard from "./components/ConferenceCard";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import PageHeader from "./components/PageHeader";
import DashboardHeader from "./components/DashboardHeader";
import ConferenceGrid from "./components/ConferenceGrid";
import ConferenceDashboard from "./components/ConferenceDashboard";
import LeadCaptureModal from "./components/LeadCaptureModal";
import ConferenceDetails from "./components/ConferenceDetails";
import LeadDetails from "./components/LeadDetails";
import AllLeadsPage from "./components/AllLeadsPage";

function App() {
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showScoreInfo, setShowScoreInfo] = useState(null);
  const [includePast, setIncludePast] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedVerticals, setSelectedVerticals] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAllLeadsPage, setShowAllLeadsPage] = useState(false);

  useEffect(() => {
    async function fetchConferences() {
      try {
        const response = await apiClient.get("/conferences/");
        setConferences(response.data);
      } catch (error) {
        setErrorMessage("Failed to load conferences");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchConferences();
  }, []);

  function handleScoreClick(conferenceId) {
    setShowScoreInfo(conferenceId);

    setTimeout(() => {
      setShowScoreInfo(null);
    }, 3500);
  }

  function getFitClass(fitLabel) {
    if (fitLabel === "High Fit") return "high-fit";
    if (fitLabel === "Medium Fit") return "medium-fit";
    return "low-fit";
  }

  function resetFilters() {
    setIncludePast(false);
    setSelectedRegions([]);
    setSelectedVerticals([]);
    setSelectedFits([]);
  }

  const regions = [
    ...new Set(conferences.map((conference) => conference.region)),
  ];

  const verticals = [
    ...new Set(conferences.map((conference) => conference.vertical)),
  ];

  const fitLevels = ["High Fit", "Medium Fit", "Low Fit"];

  const filteredConferences = conferences.filter((conference) => {
    if (!includePast && conference.status === "past") {
      return false;
    }

    if (
      selectedRegions.length > 0 &&
      !selectedRegions.includes(conference.region)
    ) {
      return false;
    }

    if (
      selectedVerticals.length > 0 &&
      !selectedVerticals.includes(conference.vertical)
    ) {
      return false;
    }

    if (
      selectedFits.length > 0 &&
      !selectedFits.includes(conference.fit_label)
    ) {
      return false;
    }

    return true;
  });
  return (
    <div className="app-container">
      <PageHeader />

      {selectedLead ? (
        <LeadDetails lead={selectedLead} onBack={() => setSelectedLead(null)} />
      ) : showAllLeadsPage ? (
        <AllLeadsPage
          onBack={() => setShowAllLeadsPage(false)}
          onViewLeadDetails={setSelectedLead}
        />
      ) : selectedConference ? (
        <ConferenceDetails
          conference={selectedConference}
          onBack={() => setSelectedConference(null)}
          onCaptureLeadClick={() => setIsLeadModalOpen(true)}
          onViewLeadDetails={setSelectedLead}
        />
      ) : (
        <ConferenceDashboard
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
          isLoading={isLoading}
          errorMessage={errorMessage}
          filteredConferences={filteredConferences}
          showScoreInfo={showScoreInfo}
          handleScoreClick={handleScoreClick}
          getFitClass={getFitClass}
          onCaptureLeadClick={() => setIsLeadModalOpen(true)}
          onOpenConferenceDetails={setSelectedConference}
          onOpenAllLeads={() => setShowAllLeadsPage(true)}
        />
      )}

      {isLeadModalOpen && (
        <LeadCaptureModal
          conferences={conferences}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
