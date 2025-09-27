import React from "react";

const EcoTourFilters = ({
  filters,
  setFilters,
  onApplyFilters,
  onClearFilters,
}) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="eco-tour-filters">
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search eco tours..."
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="search-input"
        />

        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Adventure">Adventure</option>
          <option value="Cultural">Cultural</option>
          <option value="Nature">Nature</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange("difficulty", e.target.value)}
          className="filter-select"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          className="price-input"
        />

        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="location-input"
        />
      </div>

      <div className="filter-actions">
        <button onClick={onApplyFilters} className="btn btn-primary">
          Apply Filters
        </button>
        <button onClick={onClearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default EcoTourFilters;
