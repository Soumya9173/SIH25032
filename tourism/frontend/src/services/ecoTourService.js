import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const ECOTOUR_API_URL = `${API_URL}/marketplace/ecotours`;

class EcoTourService {
  // Get all eco tours
  getAllEcoTours() {
    return axios.get(ECOTOUR_API_URL);
  }

  // Get eco tour by ID
  getEcoTourById(id) {
    return axios.get(`${ECOTOUR_API_URL}/${id}`);
  }

  // Get eco tours by type
  getEcoToursByType(tourType) {
    return axios.get(`${ECOTOUR_API_URL}/type/${tourType}`);
  }

  // Get eco tours by location
  getEcoToursByLocation(location) {
    return axios.get(`${ECOTOUR_API_URL}/location/${location}`);
  }

  // Get available eco tours
  getAvailableEcoTours() {
    return axios.get(`${ECOTOUR_API_URL}/available`);
  }

  // Get eco tours by difficulty
  getEcoToursByDifficulty(difficultyLevel) {
    return axios.get(`${ECOTOUR_API_URL}/difficulty/${difficultyLevel}`);
  }

  // Get eco tours by max price
  getEcoToursByMaxPrice(maxPrice) {
    return axios.get(`${ECOTOUR_API_URL}/price/${maxPrice}`);
  }

  // Search eco tours
  searchEcoTours(query) {
    return axios.get(`${ECOTOUR_API_URL}/search`, { params: { query } });
  }

  // Create eco tour (requires authentication)
  createEcoTour(ecoTour) {
    return axios.post(ECOTOUR_API_URL, ecoTour, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  }

  // Update eco tour (requires authentication)
  updateEcoTour(id, ecoTour) {
    return axios.put(`${ECOTOUR_API_URL}/${id}`, ecoTour, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  }

  // Delete eco tour (requires authentication)
  deleteEcoTour(id) {
    return axios.delete(`${ECOTOUR_API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  }
}

export default new EcoTourService();
