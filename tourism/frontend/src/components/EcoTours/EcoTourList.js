import React, { useState, useEffect } from "react";
import EcoTourService from "../../services/ecoTourService";
import EcoTourCard from "./EcoTourCard";
import EcoTourFilters from "./EcoTourFilters";

const EcoTourList = () => {
  const [ecoTours, setEcoTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    difficulty: "",
    maxPrice: "",
    searchQuery: "",
  });

  useEffect(() => {
    loadEcoTours();
  }, []);

  const loadEcoTours = async () => {
    try {
      setLoading(true);
      const response = await EcoTourService.getAllEcoTours();
      setEcoTours(response.data);
    } catch (error) {
      setError("Failed to load eco tours");
      console.error("Error loading eco tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      let response;

      if (filters.searchQuery) {
        response = await EcoTourService.searchEcoTours(filters.searchQuery);
      } else if (filters.type) {
        response = await EcoTourService.getEcoToursByType(filters.type);
      } else if (filters.location) {
        response = await EcoTourService.getEcoToursByLocation(filters.location);
      } else if (filters.difficulty) {
        response = await EcoTourService.getEcoToursByDifficulty(
          filters.difficulty
        );
      } else if (filters.maxPrice) {
        response = await EcoTourService.getEcoToursByMaxPrice(filters.maxPrice);
      } else {
        response = await EcoTourService.getAllEcoTours();
      }

      setEcoTours(response.data);
    } catch (error) {
      setError("Failed to apply filters");
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      location: "",
      difficulty: "",
      maxPrice: "",
      searchQuery: "",
    });
    loadEcoTours();
  };

  if (loading) return <div className="loading">Loading eco tours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="eco-tour-list">
      <h1>Eco Tours</h1>

      <EcoTourFilters
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      <div className="eco-tours-grid">
        {ecoTours.length === 0 ? (
          <div className="no-tours">No eco tours found</div>
        ) : (
          ecoTours.map((tour) => <EcoTourCard key={tour.id} ecoTour={tour} />)
        )}
      </div>
    </div>
  );
};

export default EcoTourList;
