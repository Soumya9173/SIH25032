import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Label, Row, Spinner } from 'reactstrap';
import { tourismService } from '../../services/tourismService';
import { LocationRequest, LocationResponse, NearbyPlace } from '../../types';
import toast from 'react-hot-toast';

const LocationServices: React.FC = () => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [radius, setRadius] = useState<string>('5');
  const [category, setCategory] = useState<string>('tourist_attraction');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<LocationResponse | null>(null);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toString());
        setLongitude(pos.coords.longitude.toString());
      },
      () => toast.error('Unable to retrieve your location')
    );
  };

  const useRanchiDemo = async () => {
    setLatitude('23.3441');
    setLongitude('85.3096');
    setCategory('tourist_attraction');
    setRadius('5');
    await search('23.3441', '85.3096', '5', 'tourist_attraction');
  };

  const search = async (lat?: string, lng?: string, rad?: string, cat?: string) => {
    const latVal = (lat ?? latitude).trim();
    const lngVal = (lng ?? longitude).trim();
    const radVal = (rad ?? radius).trim();
    const catVal = (cat ?? category).trim();

    if (!latVal || !lngVal) {
      toast.error('Please enter latitude and longitude or use My Location');
      return;
    }
    setIsLoading(true);
    try {
      const req: LocationRequest = {
        latitude: parseFloat(latVal),
        longitude: parseFloat(lngVal),
        radius: parseFloat(radVal) || 5,
        category: catVal,
      };
      const res = await tourismService.findNearbyPlaces(req);
      setResults(res);
      if (!res.nearbyPlaces || res.nearbyPlaces.length === 0) {
        toast('No places found. Try the Ranchi demo or another category.', { icon: 'ℹ️' });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch nearby places');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPlace = (p: NearbyPlace, i: number) => (
    <Card key={i} className="mb-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <div className="fw-bold">{p.name}</div>
            <div className="text-muted small">{p.address}</div>
            <div className="small">{p.category} • {p.distance} km</div>
          </div>
          <div className="text-end small">
            <div>Rating: {p.rating}</div>
            <div>{p.phoneNumber}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="bg-light py-4">
      <Container>
        <h2 className="mb-3">Location Services</h2>
        <Card className="mb-3">
          <CardBody>
            <Row className="g-2 align-items-end">
              <Col md={3}>
                <Label for="lat" className="small text-muted">Latitude</Label>
                <Input id="lat" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g., 23.3441" />
              </Col>
              <Col md={3}>
                <Label for="lng" className="small text-muted">Longitude</Label>
                <Input id="lng" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g., 85.3096" />
              </Col>
              <Col md={2}>
                <Label for="rad" className="small text-muted">Radius (km)</Label>
                <Input id="rad" value={radius} onChange={(e) => setRadius(e.target.value)} />
              </Col>
              <Col md={2}>
                <Label for="cat" className="small text-muted">Category</Label>
                <Input id="cat" type="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="tourist_attraction">Tourist Attraction</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel">Hotel</option>
                  <option value="transport">Transport</option>
                </Input>
              </Col>
              <Col md={2} className="d-flex gap-2">
                <Button color="secondary" onClick={useMyLocation}>My Location</Button>
                <Button color="primary" onClick={() => search()} disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button color="link" onClick={useRanchiDemo}>Use Ranchi Demo (auto-fill & search)</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {isLoading && (
          <div className="text-center py-3"><Spinner color="primary" /></div>
        )}

        {!isLoading && results && (
          <>
            <div className="mb-2 text-muted small">
              Found {results.nearbyPlaces.length} places within {results.searchRadius} km of ({results.userLatitude}, {results.userLongitude})
            </div>
            {results.nearbyPlaces.length === 0 && (
              <div className="text-muted">Try the Ranchi demo button above, or switch category.</div>
            )}
            {results.nearbyPlaces.map(renderPlace)}
          </>
        )}
      </Container>
    </div>
  );
};

export default LocationServices;