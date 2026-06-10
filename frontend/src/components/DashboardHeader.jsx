function DashboardHeader({ onCaptureLeadClick, onOpenAllLeads }) {
  return (
    <div className="section-header">
      <div>
        <h2>Explore Conferences</h2>
        <p>
          Filter active conference opportunities and open each event for lead
          capture and planning details.
        </p>
      </div>

      <div className="dashboard-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onOpenAllLeads}
        >
          View All Contacts
        </button>

        <button
          className="primary-button"
          type="button"
          onClick={onCaptureLeadClick}
        >
          + Capture Lead
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
