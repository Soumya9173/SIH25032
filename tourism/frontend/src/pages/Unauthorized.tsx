import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow text-center">
              <CardBody className="p-5">
                <FaExclamationTriangle className="text-danger mb-4" style={{ fontSize: '4rem' }} />
                <h2 className="fw-bold mb-3">Access Denied</h2>
                <p className="text-muted mb-4">
                  You don't have permission to access this page.
                </p>
                <div className="d-grid gap-2">
                  <Button
                    tag={Link}
                    to="/"
                    color="primary"
                    size="lg"
                  >
                    Go Home
                  </Button>
                  <Button
                    tag={Link}
                    to="/login"
                    color="outline-primary"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Unauthorized;
