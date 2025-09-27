import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap';
import { tourismService } from '../../services/tourismService';
import { AnalyticsResponse } from '../../types';
import toast from 'react-hot-toast';

const StatCard: React.FC<{ title: string; value: string; color?: string }> = ({ title, value, color }) => (
  <Card className="h-100 shadow-sm">
    <CardBody>
      <div className="text-muted small mb-1">{title}</div>
      <div className={`h3 fw-bold ${color ? `text-${color}` : ''}`}>{value}</div>
    </CardBody>
  </Card>
);

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await tourismService.getAnalytics();
        setData(res);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center text-muted">
        No analytics data available.
      </div>
    );
  }

  return (
    <div className="bg-light py-4">
      <Container>
        <h2 className="mb-4">Analytics Dashboard</h2>

        {/* Top stats */}
        <Row className="g-3 mb-3">
          <Col md={4}><StatCard title="Total Tourists" value={`${data.dashboardStats.totalTourists}`} color="primary" /></Col>
          <Col md={4}><StatCard title="Total Bookings" value={`${data.dashboardStats.totalBookings}`} color="success" /></Col>
          <Col md={4}><StatCard title="Average Rating" value={`${data.dashboardStats.averageRating.toFixed(1)}`} color="warning" /></Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col md={4}><StatCard title="Active Users" value={`${data.dashboardStats.activeUsers}`} /></Col>
          <Col md={4}><StatCard title="Total Feedback" value={`${data.dashboardStats.totalFeedback}`} /></Col>
          <Col md={4}><StatCard title="Total Revenue" value={`₹${data.dashboardStats.totalRevenue.toLocaleString()}`} /></Col>
        </Row>

        {/* Popular destinations */}
        <Card className="shadow-sm mb-3">
          <CardBody>
            <h5 className="mb-3">Popular Destinations</h5>
            <Row className="g-3">
              {data.popularDestinations.slice(0, 6).map((d, i) => (
                <Col md={4} key={i}>
                  <Card className="h-100">
                    <CardBody>
                      <div className="fw-bold">{d.location}</div>
                      <div className="text-muted small">Visits: {d.visitCount} • Rating: {d.averageRating}</div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>

        {/* Revenue data simple list */}
        <Card className="shadow-sm mb-3">
          <CardBody>
            <h5 className="mb-3">Revenue Overview</h5>
            {data.revenueData.slice(0, 12).map((r, i) => (
              <div key={i} className="d-flex justify-content-between border-bottom py-2 small">
                <span>{r.month} • {r.category}</span>
                <span>₹{r.revenue.toLocaleString()} ({r.bookingCount} bookings)</span>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Sentiment trends */}
        <Card className="shadow-sm">
          <CardBody>
            <h5 className="mb-3">Sentiment Trends</h5>
            {data.sentimentTrends.slice(0, 12).map((s, i) => (
              <div key={i} className="d-flex justify-content-between border-bottom py-2 small">
                <span>{s.date}</span>
                <span>+{s.positiveCount} / 0{`${s.neutralCount}`.slice(-1)} / -{s.negativeCount} • Avg: {s.averageSentimentScore.toFixed(2)}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AnalyticsDashboard;