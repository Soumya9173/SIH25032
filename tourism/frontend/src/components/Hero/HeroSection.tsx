import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Container, Row, Col, Button, Input, InputGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface HeroSlide {
  src: string;
  altText: string;
  caption: string;
  subtitle: string;
}

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  // Jharkhand tourism slides with fallback images
  const heroSlides: HeroSlide[] = [
    {
      src: imageErrors.has(0) 
        ? process.env.REACT_APP_FALLBACK_WATERFALL || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        : process.env.REACT_APP_HERO_IMAGE_1 || process.env.REACT_APP_FALLBACK_WATERFALL || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      altText: 'Hundru Falls - Natural Beauty of Jharkhand',
      caption: 'Discover Jharkhand\'s Natural Beauty',
      subtitle: 'Experience stunning waterfalls, wildlife, and tribal culture'
    },
    {
      src: imageErrors.has(1)
        ? process.env.REACT_APP_FALLBACK_TRIBAL || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        : process.env.REACT_APP_HERO_IMAGE_2 || process.env.REACT_APP_FALLBACK_TRIBAL || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      altText: 'Tribal Culture - Heritage of Jharkhand',
      caption: 'Rich Tribal Heritage & Culture',
      subtitle: 'Immerse yourself in authentic tribal traditions and festivals'
    },
    {
      src: imageErrors.has(2)
        ? process.env.REACT_APP_FALLBACK_WILDLIFE || 'https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        : process.env.REACT_APP_HERO_IMAGE_3 || process.env.REACT_APP_FALLBACK_WILDLIFE || 'https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      altText: 'Palamau Wildlife - Adventure Tourism',
      caption: 'Adventure Awaits in Jharkhand',
      subtitle: 'From wildlife safaris to nature treks, create unforgettable memories'
    },
    {
      src: imageErrors.has(3)
        ? process.env.REACT_APP_FALLBACK_HILLS || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        : process.env.REACT_APP_HERO_IMAGE_4 || process.env.REACT_APP_FALLBACK_HILLS || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      altText: 'Netarhat Hills - Hill Station Beauty',
      caption: 'Scenic Hill Stations & Valleys',
      subtitle: 'Explore the breathtaking landscapes of Netarhat and Ranchi hills'
    },
    {
      src: imageErrors.has(4)
        ? process.env.REACT_APP_FALLBACK_FESTIVAL || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        : process.env.REACT_APP_HERO_IMAGE_5 || process.env.REACT_APP_FALLBACK_FESTIVAL || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      altText: 'Tribal Festival - Cultural Celebrations',
      caption: 'Cultural Festivals & Celebrations',
      subtitle: 'Join vibrant festivals like Sarhul and experience tribal art forms'
    }
  ];

  // Handle image loading errors (Fixed TypeScript compilation issue)
  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...Array.from(prev), index]));
  };

  // Auto-play slider
  useEffect(() => {
    if (process.env.REACT_APP_HERO_AUTO_PLAY === 'true') {
      const interval = setInterval(() => {
        setActiveIndex(current => (current + 1) % heroSlides.length);
      }, parseInt(process.env.REACT_APP_HERO_SLIDE_INTERVAL || '5000'));

      return () => clearInterval(interval);
    }
  }, [heroSlides.length]);

  const next = () => {
    const nextIndex = activeIndex === heroSlides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? heroSlides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const slides = heroSlides.map((slide, index) => (
    <CarouselItem key={index}>
      <div 
        className="hero-slide d-flex align-items-center justify-content-center position-relative"
        style={{
          height: '80vh',
          color: 'white',
          overflow: 'hidden'
        }}
      >
        {/* Background Image */}
        <img
          src={slide.src}
          alt={slide.altText}
          onError={() => handleImageError(index)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        />
        
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
            zIndex: -1
          }}
        />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="text-center">
            <Col lg="8" className="mx-auto">
              <h1 
                className="display-3 fw-bold mb-3" 
                style={{ 
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                  color: '#fff'
                }}
              >
                {slide.caption}
              </h1>
              <p 
                className="lead mb-4" 
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  color: '#f8f9fa',
                  fontSize: '1.25rem'
                }}
              >
                {slide.subtitle}
              </p>
              
              {/* Search Bar */}
              <div className="mb-4">
                <InputGroup size="lg" className="mx-auto shadow-lg" style={{ maxWidth: '600px' }}>
                  <Input
                    type="text"
                    placeholder="Search destinations, homestays, eco-tours, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    style={{ 
                      borderRadius: '25px 0 0 25px', 
                      border: 'none', 
                      padding: '15px 20px',
                      fontSize: '1rem'
                    }}
                  />
                  <Button 
                    color="primary" 
                    onClick={handleSearch}
                    style={{ 
                      borderRadius: '0 25px 25px 0', 
                      border: 'none', 
                      padding: '15px 25px',
                      fontWeight: 'bold'
                    }}
                  >
                    🔍 Explore Jharkhand
                  </Button>
                </InputGroup>
              </div>
              
              {/* Action Buttons */}
              <div className="hero-actions">
                <Button 
                  color="primary" 
                  size="lg" 
                  className="me-3 shadow-lg" 
                  onClick={handleGetStarted}
                  style={{ 
                    borderRadius: '30px', 
                    padding: '15px 35px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #007bff, #0056b3)',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isAuthenticated ? `Welcome back, ${user?.name}!` : '🚀 Start Your Jharkhand Journey'}
                </Button>
                <Button 
                  color="outline-light" 
                  size="lg" 
                  tag={Link} 
                  to="/marketplace"
                  className="shadow-lg"
                  style={{ 
                    borderRadius: '30px', 
                    padding: '15px 35px',
                    fontWeight: 'bold',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🏪 Explore Marketplace
                </Button>
              </div>

              {/* Quick Links */}
              <div className="mt-4">
                <p className="text-white-50 mb-3">Quick Access:</p>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  {[
                    { to: '/itinerary', icon: '🤖', text: 'AI Planner' },
                    { to: '/chatbot', icon: '💬', text: 'Chat Assistant' },
                    { to: '/location', icon: '📍', text: 'Find Places' },
                    { to: '/transport', icon: '🚌', text: 'Transport' }
                  ].map((link, idx) => (
                    <Button 
                      key={idx}
                      color="outline-light" 
                      size="sm" 
                      tag={Link} 
                      to={link.to}
                      style={{ 
                        borderRadius: '20px', 
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {link.icon} {link.text}
                    </Button>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </CarouselItem>
  ));

  return (
    <section className="hero-section">
      <Carousel 
        activeIndex={activeIndex} 
        next={next} 
        previous={previous}
        pause="hover"
        ride={process.env.REACT_APP_HERO_AUTO_PLAY === 'true' ? 'carousel' : undefined}
      >
        <CarouselIndicators 
          items={heroSlides} 
          activeIndex={activeIndex} 
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl 
          direction="prev" 
          directionText="Previous" 
          onClickHandler={previous}
        />
        <CarouselControl 
          direction="next" 
          directionText="Next" 
          onClickHandler={next}
        />
      </Carousel>
    </section>
  );
};

// Export the component to make it a proper module
export default HeroSection;
