import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import {
  FaMap,
  FaComments,
  FaShoppingBag,
  FaChartBar,
  FaMagic,
  FaGlobe,
  FaShieldAlt,
  FaHeart,
  FaArrowRight,
} from 'react-icons/fa';

const Home: React.FC = () => {
  const features = [
    {
      name: 'AI-Powered Itinerary Planning',
      description: 'Get personalized travel plans based on your preferences, budget, and interests.',
      icon: FaMagic,
      href: '/itinerary',
      color: 'bg-primary',
    },
    {
      name: 'Multilingual Chatbot',
      description: 'Get instant assistance in English, Hindi, and tribal languages.',
      icon: FaComments,
      href: '/chatbot',
      color: 'bg-warning',
    },
    {
      name: 'Local Marketplace',
      description: 'Discover authentic handicrafts, events, homestays, and eco-tours.',
      icon: FaShoppingBag,
      href: '/marketplace',
      color: 'bg-success',
    },
    {
      name: 'Location Services',
      description: 'Find nearby attractions, restaurants, and services with GPS integration.',
      icon: FaMap,
      href: '/location',
      color: 'bg-info',
    },
    {
      name: 'Blockchain Security',
      description: 'Secure transactions and verified guide credentials on blockchain.',
      icon: FaShieldAlt,
      href: '/blockchain',
      color: 'bg-dark',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Comprehensive tourism insights and sentiment analysis for admins.',
      icon: FaChartBar,
      href: '/admin/analytics',
      color: 'bg-danger',
    },
  ];

  const stats = [
    { name: 'Tourists Served', value: '10,000+' },
    { name: 'Destinations', value: '50+' },
    { name: 'Local Partners', value: '200+' },
    { name: 'Languages Supported', value: '3' },
  ];

  const destinations = [
    {
      name: 'Ranchi',
      description: 'Capital city with beautiful lakes and tribal culture',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500',
    },
    {
      name: 'Jamshedpur',
      description: 'Steel city with industrial heritage and green spaces',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    },
    {
      name: 'Netarhat',
      description: 'Queen of Chotanagpur with scenic hill stations',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    },
    {
      name: 'Betla National Park',
      description: 'Wildlife sanctuary with tigers and elephants',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-white">
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Discover{' '}
                <span className="text-warning">Jharkhand</span>
              </h1>
              <p className="lead mb-5">
                Experience the rich tribal culture, wildlife, and natural beauty of Jharkhand 
                with our AI-powered tourism platform
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  tag={Link}
                  to="/itinerary"
                  color="warning"
                  size="lg"
                  className="px-4"
                >
                  Plan Your Trip
                </Button>
                <Button
                  tag={Link}
                  to="/marketplace"
                  color="outline-light"
                  size="lg"
                  className="px-4"
                >
                  Explore Marketplace
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-5">
        <Container>
          <Row>
            {stats.map((stat) => (
              <Col md={3} key={stat.name} className="text-center mb-4">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.name}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                Why Choose Our Platform?
              </h2>
              <p className="lead text-muted">
                We combine cutting-edge technology with local expertise to provide 
                you with the best tourism experience in Jharkhand.
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature) => (
              <Col md={6} lg={4} key={feature.name} className="mb-4">
                <Card className="feature-card h-100">
                  <CardBody className="text-center p-4">
                    <div className={`${feature.color} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '60px', height: '60px' }}>
                      <feature.icon className="text-white fs-4" />
                    </div>
                    <h5 className="fw-bold mb-3">{feature.name}</h5>
                    <p className="text-muted mb-3">{feature.description}</p>
                    <Button
                      tag={Link}
                      to={feature.href}
                      color="primary"
                      outline
                      className="w-100"
                    >
                      Learn More <FaArrowRight className="ms-2" />
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Destinations Section */}
      <div className="bg-white py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                Popular Destinations
              </h2>
              <p className="lead text-muted">
                Explore the diverse landscapes and rich cultural heritage of Jharkhand
              </p>
            </Col>
          </Row>
          <Row>
            {destinations.map((destination) => (
              <Col md={6} lg={3} key={destination.name} className="mb-4">
                <Card className="card-hover h-100">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardBody>
                    <h5 className="fw-bold mb-2">{destination.name}</h5>
                    <p className="text-muted">{destination.description}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-secondary text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">
                Ready to Explore Jharkhand?
              </h2>
              <p className="lead mb-5">
                Join thousands of travelers who have discovered the hidden gems of Jharkhand 
                with our AI-powered platform
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button
                  tag={Link}
                  to="/register"
                  color="light"
                  size="lg"
                  className="px-4"
                >
                  Get Started Today
                </Button>
                <Button
                  tag={Link}
                  to="/chatbot"
                  color="outline-light"
                  size="lg"
                  className="px-4"
                >
                  Ask Our Chatbot
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Testimonial Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                What Our Travelers Say
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <CardBody className="p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <FaHeart className="text-danger fs-2" />
                  </div>
                  <p className="text-muted mb-4">
                    "The AI itinerary planning helped me discover places I never knew existed. 
                    The tribal homestay experience was unforgettable!"
                  </p>
                  <div className="fw-bold">Priya Sharma</div>
                  <div className="text-muted small">Mumbai, India</div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <CardBody className="p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <FaGlobe className="text-primary fs-2" />
                  </div>
                  <p className="text-muted mb-4">
                    "The multilingual chatbot made it so easy to communicate with locals. 
                    I felt like a local myself!"
                  </p>
                  <div className="fw-bold">John Smith</div>
                  <div className="text-muted small">London, UK</div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <CardBody className="p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <FaShieldAlt className="text-success fs-2" />
                  </div>
                  <p className="text-muted mb-4">
                    "The blockchain verification gave me confidence in the guides. 
                    Everything was transparent and secure."
                  </p>
                  <div className="fw-bold">Rajesh Kumar</div>
                  <div className="text-muted small">Delhi, India</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
