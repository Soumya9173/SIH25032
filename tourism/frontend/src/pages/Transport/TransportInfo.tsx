import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Label, Row, Spinner } from 'reactstrap';
import { tourismService } from '../../services/tourismService';
import { TransportRequest, TransportResponse, TransportOption } from '../../types';
import toast from 'react-hot-toast';

const TransportInfo: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [transportType, setTransportType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TransportResponse | null>(null);

  const search = async () => {
    if (!source || !destination) {
      toast.error('Please enter both source and destination');
      return;
    }
    setIsLoading(true);
    try {
      const req: TransportRequest = {
        source,
        destination,
        transportType: transportType || undefined,
        date: date || undefined,
        time: time || undefined,
        passengers: parseInt(passengers || '1', 10),
      };
      const res = await tourismService.getTransportInfo(req);
      setResults(res);
      if (!res.options || res.options.length === 0) {
        toast('No transport options found for the given inputs.', { icon: 'ℹ️' });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch transport info');
    } finally {
      setIsLoading(false);
    }
  };

  const renderOption = (o: TransportOption, i: number) => (
    <Card key={i} className="mb-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <div className="fw-bold">{o.transportType} • {o.operator}</div>
            <div className="text-muted small">{o.route} • {o.status}</div>
            <div className="small">Dep {o.departureTime} → Arr {o.arrivalTime} • {o.duration}</div>
            <div className="small">Amenities: {o.amenities}</div>
          </div>
          <div className="text-end">
            <div className="h5 mb-1">₹{o.price}</div>
            <div className="small text-muted">Seats: {o.availableSeats}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="bg-light py-4">
      <Container>
        <h2 className="mb-3">Transport Information</h2>
        <Card className="mb-3">
          <CardBody>
            <Row className="g-2 align-items-end">
              <Col md={3}>
                <Label className="small text-muted">Source</Label>
                <Input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., Ranchi" />
              </Col>
              <Col md={3}>
                <Label className="small text-muted">Destination</Label>
                <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Jamshedpur" />
              </Col>
              <Col md={2}>
                <Label className="small text-muted">Type</Label>
                <Input type="select" value={transportType} onChange={(e) => setTransportType(e.target.value)}>
                  <option value="">Any</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="taxi">Taxi</option>
                </Input>
              </Col>
              <Col md={2}>
                <Label className="small text-muted">Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Col>
              <Col md={1}>
                <Label className="small text-muted">Time</Label>
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </Col>
              <Col md={1}>
                <Label className="small text-muted">Pax</Label>
                <Input type="number" min={1} value={passengers} onChange={(e) => setPassengers(e.target.value)} />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button color="primary" onClick={search} disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {isLoading && <div className="text-center py-3"><Spinner color="primary" /></div>}
        {!isLoading && results && (
          <>
            <div className="mb-2 text-muted small">Found {results.options.length} options from {results.source} to {results.destination}</div>
            {results.options.map(renderOption)}
          </>
        )}
      </Container>
    </div>
  );
};

export default TransportInfo;