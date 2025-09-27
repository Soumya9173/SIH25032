import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Input, Nav, NavItem, NavLink, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { tourismService } from '../../services/tourismService';
import { Product, Event, Homestay, EcoTour } from '../../types';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

 type TabKey = 'products' | 'events' | 'homestays' | 'ecotours';

const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('products');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [ecoTours, setEcoTours] = useState<EcoTour[]>([]);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTitle, setDetailTitle] = useState('');
  const [detailBody, setDetailBody] = useState<React.ReactNode>(null);

  const { user } = useAuthStore();
  const isManager = user?.role === 'ADMIN' || user?.role === 'GUIDE';

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createData, setCreateData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetCreateData = (tab: TabKey) => {
    switch (tab) {
      case 'products':
        setCreateData({ name: '', description: '', price: 0, category: '', imageUrl: '', stockQuantity: 0, isAvailable: true, sellerName: '', sellerContact: '', location: '' });
        break;
      case 'events':
        setCreateData({ name: '', description: '', eventType: '', startDate: '', endDate: '', venue: '', location: '', ticketPrice: 0, maxAttendees: 0, isActive: true, imageUrl: '' });
        break;
      case 'homestays':
        setCreateData({ name: '', description: '', ownerName: '', ownerContact: '', address: '', location: '', latitude: 0, longitude: 0, pricePerNight: 0, maxGuests: 1, amenities: '', roomType: '', imageUrls: '', rating: 0, totalReviews: 0, isAvailable: true });
        break;
      case 'ecotours':
        setCreateData({ name: '', description: '', tourType: '', durationHours: 1, difficultyLevel: '', maxParticipants: 10, currentParticipants: 0, pricePerPerson: 0, guideName: '', guideContact: '', guideLicense: '', meetingPoint: '', location: '', latitude: 0, longitude: 0, includes: '', excludes: '', imageUrls: '', rating: 0, totalReviews: 0, isAvailable: true });
        break;
    }
  };

  const fetchData = async (tab: TabKey, q?: string) => {
    setIsLoading(true);
    try {
      switch (tab) {
        case 'products': {
          const data = q ? await tourismService.searchProducts(q) : await tourismService.getProducts();
          setProducts(data);
          break;
        }
        case 'events': {
          const data = q ? await tourismService.searchEvents(q) : await tourismService.getEvents();
          setEvents(data);
          break;
        }
        case 'homestays': {
          const data = q ? await tourismService.searchHomestays(q) : await tourismService.getHomestays();
          setHomestays(data);
          break;
        }
        case 'ecotours': {
          const data = q ? await tourismService.searchEcoTours(q) : await tourismService.getEcoTours();
          setEcoTours(data);
          break;
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load marketplace data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onSearch = () => {
    fetchData(activeTab, query.trim() || undefined);
  };

  const openDetails = async (tab: TabKey, id: number) => {
    try {
      if (tab === 'products') {
        const item = await tourismService.getProductById(id);
        setDetailTitle(item.name);
        setDetailBody(
          <div className="small">
            <div className="mb-2">Category: {item.category}</div>
            <div className="mb-2">Price: ₹{item.price}</div>
            <div className="mb-2">Location: {item.location}</div>
            <div className="mb-2">Available: {item.isAvailable ? 'Yes' : 'No'}</div>
            <div>Description: {item.description}</div>
          </div>
        );
      } else if (tab === 'events') {
        const item = await tourismService.getEventById(id);
        setDetailTitle(item.name);
        setDetailBody(
          <div className="small">
            <div className="mb-2">Type: {item.eventType}</div>
            <div className="mb-2">Dates: {item.startDate} – {item.endDate}</div>
            <div className="mb-2">Location: {item.location}</div>
            <div className="mb-2">Venue: {item.venue}</div>
            <div>Description: {item.description}</div>
          </div>
        );
      } else if (tab === 'homestays') {
        const item = await tourismService.getHomestayById(id);
        setDetailTitle(item.name);
        setDetailBody(
          <div className="small">
            <div className="mb-2">Price/Night: ₹{item.pricePerNight}</div>
            <div className="mb-2">Max Guests: {item.maxGuests}</div>
            <div className="mb-2">Location: {item.location}</div>
            <div className="mb-2">Available: {item.isAvailable ? 'Yes' : 'No'}</div>
            <div>Description: {item.description}</div>
          </div>
        );
      } else if (tab === 'ecotours') {
        const item = await tourismService.getEcoTourById(id);
        setDetailTitle(item.name);
        setDetailBody(
          <div className="small">
            <div className="mb-2">Type: {item.tourType}</div>
            <div className="mb-2">Duration: {item.durationHours} hrs</div>
            <div className="mb-2">Price/Person: ₹{item.pricePerPerson}</div>
            <div className="mb-2">Location: {item.location}</div>
            <div>Description: {item.description}</div>
          </div>
        );
      }
      setIsDetailOpen(true);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load details');
    }
  };

  const openCreate = () => {
    resetCreateData(activeTab);
    setIsCreateOpen(true);
  };

  const submitCreate = async () => {
    setIsSubmitting(true);
    try {
      if (activeTab === 'products') {
        await tourismService.createProduct(createData);
      } else if (activeTab === 'events') {
        await tourismService.createEvent(createData);
      } else if (activeTab === 'homestays') {
        await tourismService.createHomestay(createData);
      } else if (activeTab === 'ecotours') {
        await tourismService.createEcoTour(createData);
      }
      toast.success('Created successfully');
      setIsCreateOpen(false);
      fetchData(activeTab);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCreateFields = () => {
    const onChange = (key: string, val: any) => setCreateData((prev: any) => ({ ...prev, [key]: val }));
    if (activeTab === 'products') {
      return (
        <>
          <Label className="small">Name</Label>
          <Input value={createData.name} onChange={(e) => onChange('name', e.target.value)} className="mb-2" />
          <Label className="small">Category</Label>
          <Input value={createData.category} onChange={(e) => onChange('category', e.target.value)} className="mb-2" />
          <Label className="small">Price</Label>
          <Input type="number" value={createData.price} onChange={(e) => onChange('price', parseFloat(e.target.value || '0'))} className="mb-2" />
          <Label className="small">Location</Label>
          <Input value={createData.location} onChange={(e) => onChange('location', e.target.value)} className="mb-2" />
          <Label className="small">Description</Label>
          <Input value={createData.description} onChange={(e) => onChange('description', e.target.value)} className="mb-2" />
        </>
      );
    }
    if (activeTab === 'events') {
      return (
        <>
          <Label className="small">Name</Label>
          <Input value={createData.name} onChange={(e) => onChange('name', e.target.value)} className="mb-2" />
          <Label className="small">Type</Label>
          <Input value={createData.eventType} onChange={(e) => onChange('eventType', e.target.value)} className="mb-2" />
          <Label className="small">Start Date</Label>
          <Input type="date" value={createData.startDate} onChange={(e) => onChange('startDate', e.target.value)} className="mb-2" />
          <Label className="small">End Date</Label>
          <Input type="date" value={createData.endDate} onChange={(e) => onChange('endDate', e.target.value)} className="mb-2" />
          <Label className="small">Venue</Label>
          <Input value={createData.venue} onChange={(e) => onChange('venue', e.target.value)} className="mb-2" />
          <Label className="small">Location</Label>
          <Input value={createData.location} onChange={(e) => onChange('location', e.target.value)} className="mb-2" />
          <Label className="small">Ticket Price</Label>
          <Input type="number" value={createData.ticketPrice} onChange={(e) => onChange('ticketPrice', parseFloat(e.target.value || '0'))} className="mb-2" />
          <Label className="small">Description</Label>
          <Input value={createData.description} onChange={(e) => onChange('description', e.target.value)} className="mb-2" />
        </>
      );
    }
    if (activeTab === 'homestays') {
      return (
        <>
          <Label className="small">Name</Label>
          <Input value={createData.name} onChange={(e) => onChange('name', e.target.value)} className="mb-2" />
          <Label className="small">Location</Label>
          <Input value={createData.location} onChange={(e) => onChange('location', e.target.value)} className="mb-2" />
          <Label className="small">Price/Night</Label>
          <Input type="number" value={createData.pricePerNight} onChange={(e) => onChange('pricePerNight', parseFloat(e.target.value || '0'))} className="mb-2" />
          <Label className="small">Max Guests</Label>
          <Input type="number" value={createData.maxGuests} onChange={(e) => onChange('maxGuests', parseInt(e.target.value || '1', 10))} className="mb-2" />
          <Label className="small">Description</Label>
          <Input value={createData.description} onChange={(e) => onChange('description', e.target.value)} className="mb-2" />
        </>
      );
    }
    // ecotours
    return (
      <>
        <Label className="small">Name</Label>
        <Input value={createData.name} onChange={(e) => onChange('name', e.target.value)} className="mb-2" />
        <Label className="small">Type</Label>
        <Input value={createData.tourType} onChange={(e) => onChange('tourType', e.target.value)} className="mb-2" />
        <Label className="small">Duration (hours)</Label>
        <Input type="number" value={createData.durationHours} onChange={(e) => onChange('durationHours', parseInt(e.target.value || '1', 10))} className="mb-2" />
        <Label className="small">Price/Person</Label>
        <Input type="number" value={createData.pricePerPerson} onChange={(e) => onChange('pricePerPerson', parseFloat(e.target.value || '0'))} className="mb-2" />
        <Label className="small">Location</Label>
        <Input value={createData.location} onChange={(e) => onChange('location', e.target.value)} className="mb-2" />
        <Label className="small">Description</Label>
        <Input value={createData.description} onChange={(e) => onChange('description', e.target.value)} className="mb-2" />
      </>
    );
  };

  const renderEmpty = (text: string) => (
    <div className="text-muted text-center py-5">{text}</div>
  );

  const renderProducts = () => (
    <Row className="g-3">
      {products.length === 0 && !isLoading && renderEmpty('No products found')}
      {products.map((p) => (
        <Col md={6} lg={4} key={p.id}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <CardTitle tag="h5">{p.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{p.category} • ₹{p.price}</CardSubtitle>
              <CardText className="small">{p.description}</CardText>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-muted">{p.location}</span>
                <Button size="sm" color="primary" onClick={() => openDetails('products', p.id)}>View</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderEvents = () => (
    <Row className="g-3">
      {events.length === 0 && !isLoading && renderEmpty('No events found')}
      {events.map((e) => (
        <Col md={6} lg={4} key={e.id}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <CardTitle tag="h5">{e.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{e.eventType} • {e.startDate} – {e.endDate}</CardSubtitle>
              <CardText className="small">{e.description}</CardText>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-muted">{e.location}</span>
                <Button size="sm" color="primary" onClick={() => openDetails('events', e.id)}>View</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderHomestays = () => (
    <Row className="g-3">
      {homestays.length === 0 && !isLoading && renderEmpty('No homestays found')}
      {homestays.map((h) => (
        <Col md={6} lg={4} key={h.id}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <CardTitle tag="h5">{h.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">Max {h.maxGuests} guests • ₹{h.pricePerNight}/night</CardSubtitle>
              <CardText className="small">{h.description}</CardText>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-muted">{h.location}</span>
                <Button size="sm" color="primary" onClick={() => openDetails('homestays', h.id)}>View</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderEcoTours = () => (
    <Row className="g-3">
      {ecoTours.length === 0 && !isLoading && renderEmpty('No eco tours found')}
      {ecoTours.map((t) => (
        <Col md={6} lg={4} key={t.id}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <CardTitle tag="h5">{t.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{t.tourType} • {t.durationHours} hrs • ₹{t.pricePerPerson}/person</CardSubtitle>
              <CardText className="small">{t.description}</CardText>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-muted">{t.location}</span>
                <Button size="sm" color="primary" onClick={() => openDetails('ecotours', t.id)}>View</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="min-vh-100 d-flex align-items-start bg-light py-4">
      <Container>
        <h2 className="mb-3">Marketplace</h2>

        <Row className="g-2 align-items-center mb-3">
          <Col md={8}>
            <Nav pills>
              <NavItem>
                <NavLink href="#" active={activeTab === 'products'} onClick={() => setActiveTab('products')}>Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={activeTab === 'events'} onClick={() => setActiveTab('events')}>Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={activeTab === 'homestays'} onClick={() => setActiveTab('homestays')}>Homestays</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" active={activeTab === 'ecotours'} onClick={() => setActiveTab('ecotours')}>Eco Tours</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md={4} className="d-flex gap-2 justify-content-end">
            <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button color="primary" onClick={onSearch} disabled={isLoading}>Search</Button>
            {isManager && (
              <Button color="success" onClick={openCreate}>Add</Button>
            )}
          </Col>
        </Row>

        {isLoading && (
          <div className="text-center py-4"><Spinner color="primary" /></div>
        )}

        {!isLoading && (
          <>
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'homestays' && renderHomestays()}
            {activeTab === 'ecotours' && renderEcoTours()}
          </>
        )}

        <Modal isOpen={isDetailOpen} toggle={() => setIsDetailOpen(false)}>
          <ModalHeader toggle={() => setIsDetailOpen(false)}>{detailTitle}</ModalHeader>
          <ModalBody>{detailBody}</ModalBody>
        </Modal>

        <Modal isOpen={isCreateOpen} toggle={() => setIsCreateOpen(false)}>
          <ModalHeader toggle={() => setIsCreateOpen(false)}>Add {activeTab.slice(0, 1).toUpperCase() + activeTab.slice(1)}</ModalHeader>
          <ModalBody>
            {renderCreateFields()}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setIsCreateOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button color="primary" onClick={submitCreate} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default Marketplace;