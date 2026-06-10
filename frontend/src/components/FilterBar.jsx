import { useState } from "react";

function FiltersBar({
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
}) {
  const [openFilter, setOpenFilter] = useState(null);

  function toggleValue(value, selectedValues, setSelectedValues) {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  }

  function toggleOpen(filterName) {
    setOpenFilter(openFilter === filterName ? null : filterName);
  }

  function renderFilter(title, filterName, options, selectedValues, setSelectedValues) {
    return (
      <div className="multi-filter">
        <button
          className="multi-filter-button"
          type="button"
          onClick={() => toggleOpen(filterName)}
        >
          {title}
        </button>

        <div className={`multi-filter-menu ${openFilter === filterName ? "is-open" : ""}`}>
          {options.map((option) => (
            <label className="multi-filter-option" key={option}>
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => toggleValue(option, selectedValues, setSelectedValues)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="filters-section">
      <label className="checkbox-filter">
        <input
          type="checkbox"
          checked={includePast}
          onChange={(event) => setIncludePast(event.target.checked)}
        />
        Include past conferences
      </label>

      {renderFilter("All Regions", "regions", regions, selectedRegions, setSelectedRegions)}
      {renderFilter("All Verticals", "verticals", verticals, selectedVerticals, setSelectedVerticals)}
      {renderFilter("All Fit Levels", "fits", fitLevels, selectedFits, setSelectedFits)}

      <button className="reset-filters-button" type="button" onClick={resetFilters}>
        Reset filters
      </button>
    </div>
  );
}

export default FiltersBar;