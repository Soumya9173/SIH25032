import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        <Row>
          {/* Company Info */}
          <Col md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-gradient-primary rounded p-2 me-2 d-flex align-items-center justify-content-center">
                <span className="text-white fw-bold fs-5">J</span>
              </div>
              <span className="fs-4 fw-bold">Jharkhand Tourism</span>
            </div>
            <p className="text-muted mb-3">
              Discover the beauty of Jharkhand with our AI-powered tourism platform. 
              Experience authentic tribal culture, wildlife, and natural wonders.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted fs-4">
                <FaFacebook />
              </a>
              <a href="#" className="text-muted fs-4">
                <FaInstagram />
              </a>
              <a href="#" className="text-muted fs-4">
                <FaTwitter />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/itinerary" className="text-muted text-decoration-none">
                  Plan Trip
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/marketplace" className="text-muted text-decoration-none">
                  Marketplace
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/chatbot" className="text-muted text-decoration-none">
                  Chatbot
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="text-primary me-2" />
                <span className="text-muted">Ranchi, Jharkhand, India</span>
              </div>
              <div className="d-flex align-items-center">
                <FaPhone className="text-primary me-2" />
                <span className="text-muted">+91 9876543210</span>
              </div>
              <div className="d-flex align-items-center">
                <FaEnvelope className="text-primary me-2" />
                <span className="text-muted">info@jharkhandtourism.com</span>
              </div>
              <div className="d-flex align-items-center">
                <FaGlobe className="text-primary me-2" />
                <span className="text-muted">www.jharkhandtourism.com</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">
              © 2024 Jharkhand Tourism Platform. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <Link to="/privacy" className="text-muted text-decoration-none">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted text-decoration-none">
                Terms of Service
              </Link>
              <Link to="/about" className="text-muted text-decoration-none">
                About Us
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
