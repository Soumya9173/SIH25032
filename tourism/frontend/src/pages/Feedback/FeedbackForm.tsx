import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Label, Row, Spinner } from 'reactstrap';
import { tourismService } from '../../services/tourismService';
import { FeedbackRequest, FeedbackResponse } from '../../types';
import toast from 'react-hot-toast';

const FeedbackForm: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('5');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<FeedbackResponse[]>([]);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await tourismService.getFeedbacks();
      setItems(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load feedback');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!feedbackText.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    setIsSubmitting(true);
    try {
      const req: FeedbackRequest = {
        feedbackText: feedbackText.trim(),
        rating: parseInt(rating, 10),
        category,
      };
      await tourismService.submitFeedback(req);
      toast.success('Feedback submitted');
      setFeedbackText('');
      setRating('5');
      await load();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light py-4">
      <Container>
        <h2 className="mb-3">Feedback</h2>

        <Card className="mb-3">
          <CardBody>
            <Row className="g-2 align-items-end">
              <Col md={8}>
                <Label className="small text-muted">Your Feedback</Label>
                <Input type="textarea" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={3} placeholder="Share your experience..." />
              </Col>
              <Col md={2}>
                <Label className="small text-muted">Rating</Label>
                <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
              </Col>
              <Col md={2}>
                <Label className="small text-muted">Category</Label>
                <Input type="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="general">General</option>
                  <option value="location">Location</option>
                  <option value="transport">Transport</option>
                  <option value="accommodation">Accommodation</option>
                </Input>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button color="primary" onClick={submit} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h5 className="mb-3">Recent Feedback</h5>
            {isLoading && <div className="text-center py-3"><Spinner color="primary" /></div>}
            {!isLoading && items.length === 0 && <div className="text-muted">No feedback yet.</div>}
            {!isLoading && items.map((f) => (
              <div key={f.feedbackId} className="border-bottom py-2 small">
                <div className="fw-bold">{f.category} • {f.rating}/5</div>
                <div>{f.feedbackText}</div>
                <div className="text-muted">{f.entityType || 'General'} {f.entityId ? `#${f.entityId}` : ''}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default FeedbackForm;