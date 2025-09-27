import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EcoTourService from "../../services/ecoTourService";

const EcoTourDetail = () => {
  const { id } = useParams();
  const [ecoTour, setEcoTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEcoTour();
  }, [id]);

  const loadEcoTour = async () => {
    try {
      setLoading(true);
      const response = await EcoTourService.getEcoTourById(id);
      setEcoTour(response.data);
    } catch (error) {
      setError("Failed to load eco tour details");
      console.error("Error loading eco tour:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="loading">Loading eco tour details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ecoTour) return <div className="error">Eco tour not found</div>;

  return (
    <div className="eco-tour-detail">
      <Link to="/ecotours" className="back-link">
        ← Back to Eco Tours
      </Link>

      <div className="tour-header">
        <h1>{ecoTour.title}</h1>
        <div className="tour-meta">
          <span className="location">{ecoTour.location}</span>
          <span className="price">₹{ecoTour.price}</span>
        </div>
      </div>

      {ecoTour.imageUrl && (
        <div className="tour-image-large">
          <img src={ecoTour.imageUrl} alt={ecoTour.title} />
        </div>
      )}

      <div className="tour-info">
        <div className="tour-description">
          <h3>Description</h3>
          <p>{ecoTour.description}</p>
        </div>

        <div className="tour-details-grid">
          <div className="detail-item">
            <strong>Type:</strong> {ecoTour.tourType}
          </div>
          <div className="detail-item">
            <strong>Difficulty:</strong> {ecoTour.difficultyLevel}
          </div>
          <div className="detail-item">
            <strong>Duration:</strong> {ecoTour.duration} days
          </div>
          <div className="detail-item">
            <strong>Group Size:</strong> {ecoTour.maxGroupSize} people
          </div>
          <div className="detail-item">
            <strong>Available:</strong> {ecoTour.available ? "Yes" : "No"}
          </div>
        </div>

        {ecoTour.available && (
          <div className="booking-section">
            <button className="btn btn-primary btn-large">
              Book This Tour - ₹{ecoTour.price}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoTourDetail;
