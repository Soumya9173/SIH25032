import React from "react";
import { Link } from "react-router-dom";

const EcoTourCard = ({ ecoTour }) => {
  return (
    <div className="eco-tour-card">
      <div className="tour-image">
        {ecoTour.imageUrl ? (
          <img src={ecoTour.imageUrl} alt={ecoTour.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="tour-content">
        <h3>{ecoTour.title}</h3>
        <p className="tour-location">{ecoTour.location}</p>
        <p className="tour-description">{ecoTour.description}</p>

        <div className="tour-details">
          <span className="tour-type">{ecoTour.tourType}</span>
          <span className="tour-difficulty">{ecoTour.difficultyLevel}</span>
          <span className="tour-duration">{ecoTour.duration} days</span>
        </div>

        <div className="tour-pricing">
          <span className="tour-price">₹{ecoTour.price}</span>
          <span
            className={`tour-availability ${
              ecoTour.available ? "available" : "unavailable"
            }`}
          >
            {ecoTour.available ? "Available" : "Not Available"}
          </span>
        </div>

        <div className="tour-actions">
          <Link to={`/ecotours/${ecoTour.id}`} className="btn btn-primary">
            View Details
          </Link>
          {ecoTour.available && (
            <button className="btn btn-secondary">Book Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoTourCard;
