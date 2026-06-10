function EmptyState() {
  return (
    <div className="empty-state">
      <h3>No conferences found</h3>

      <p>
        No conferences match the selected filters right now. Try adjusting your
        filters to explore more events.
      </p>
    </div>
  );
}

export default EmptyState;