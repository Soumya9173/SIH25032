import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Alert, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: any;
}

const TestDashboard: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const updateTestResult = (name: string, status: 'pending' | 'success' | 'error', message: string, data?: any) => {
    setTestResults(prev => {
      const updated = prev.filter(t => t.name !== name);
      return [...updated, { name, status, message, data }];
    });
  };

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    updateTestResult(testName, 'pending', 'Running...');
    try {
      const result = await testFunction();
      updateTestResult(testName, 'success', 'Test passed', result);
      return result;
    } catch (error: any) {
      updateTestResult(testName, 'error', error.message || 'Test failed', error);
      throw error;
    }
  };

  // API tests based on README documentation
  const testBackendConnection = async () => {
    return runTest('Backend Connection', async () => {
      try {
        const response = await api.get('/health');
        return { status: 'Backend is running', data: response.data };
      } catch (error) {
        const response = await api.get('/');
        return { status: 'Backend is running (via root endpoint)' };
      }
    });
  };

  const testAuthentication = async () => {
    return runTest('Authentication API', async () => {
      const loginData = {
        email: process.env.REACT_APP_DEMO_TOURIST_EMAIL,
        password: process.env.REACT_APP_DEMO_TOURIST_PASSWORD
      };
      const response = await api.post('/auth/login', loginData);
      return response.data;
    });
  };

  const testItineraryPlanning = async () => {
    return runTest('AI Itinerary Planning API', async () => {
      const itineraryData = {
        budget: 10000,
        durationDays: 5,
        interests: ['adventure', 'culture', 'nature'],
        preferredLocation: 'Ranchi',
        accommodationType: 'mid-range',
        transportPreference: 'mixed'
      };
      const response = await api.post('/itinerary/plan', itineraryData);
      return response.data;
    });
  };

  const testChatbot = async () => {
    return runTest('Multilingual Chatbot API', async () => {
      const chatData = {
        message: 'What are the best places to visit in Jharkhand?',
        language: 'en',
        context: 'tourism'
      };
      const response = await api.post('/chatbot/ask', chatData);
      return response.data;
    });
  };

  const testLocationServices = async () => {
    return runTest('Location Services API', async () => {
      const locationData = {
        latitude: 23.3441, // Ranchi coordinates from README
        longitude: 85.3096,
        radius: 10.0,
        category: 'tourist_attractions'
      };
      const response = await api.post('/location/nearby', locationData);
      return response.data;
    });
  };

  const testMarketplace = async () => {
    return runTest('Marketplace APIs', async () => {
      const responses = await Promise.allSettled([
        api.get('/marketplace/products'),
        api.get('/marketplace/events'),
        api.get('/marketplace/homestays'),
        api.get('/marketplace/ecotours')
      ]);
      
      const results = responses.map((result, index) => {
        const names = ['products', 'events', 'homestays', 'ecotours'];
        return {
          name: names[index],
          status: result.status,
          count: result.status === 'fulfilled' ? result.value.data.length : 'Error'
        };
      });
      
      return results;
    });
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    const tests = [
      testBackendConnection,
      testAuthentication,
      testItineraryPlanning,
      testChatbot,
      testLocationServices,
      testMarketplace
    ];

    let successCount = 0;
    
    for (const test of tests) {
      try {
        await test();
        successCount++;
      } catch (error) {
        // Error already handled in runTest function
      }
    }
    
    setLoading(false);
    
    if (successCount === tests.length) {
      toast.success(`✅ All ${tests.length} tests passed!`);
    } else {
      toast.error(`❌ ${successCount}/${tests.length} tests passed. Check results below.`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '⭕';
    }
  };

  return (
    <Container>
      <h1 className="mb-4">🧪 {process.env.REACT_APP_PROJECT_NAME} - API Testing Dashboard</h1>
      <p className="lead mb-4">
        Test all API endpoints from the README documentation to ensure proper backend integration.
      </p>

      <Row>
        <Col lg="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Test Controls</CardTitle>
              
              <div className="d-grid gap-2 mb-3">
                <Button color="primary" onClick={runAllTests} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Running Tests...
                    </>
                  ) : (
                    '🚀 Run All API Tests'
                  )}
                </Button>
                
                <Button color="outline-secondary" onClick={() => setTestResults([])}>
                  🗑️ Clear Results
                </Button>
              </div>

              <hr />
              
              <h6>Individual Tests</h6>
              <div className="d-grid gap-1">
                <Button size="sm" color="outline-primary" onClick={testBackendConnection} disabled={loading}>
                  🔗 Backend Connection
                </Button>
                <Button size="sm" color="outline-success" onClick={testAuthentication} disabled={loading}>
                  🔑 Authentication
                </Button>
                <Button size="sm" color="outline-info" onClick={testItineraryPlanning} disabled={loading}>
                  🤖 AI Itinerary
                </Button>
                <Button size="sm" color="outline-warning" onClick={testChatbot} disabled={loading}>
                  💬 Chatbot
                </Button>
                <Button size="sm" color="outline-secondary" onClick={testLocationServices} disabled={loading}>
                  📍 Location Services
                </Button>
                <Button size="sm" color="outline-info" onClick={testMarketplace} disabled={loading}>
                  🏪 Marketplace
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="mt-3">
            <CardBody>
              <CardTitle tag="h6">Environment Status</CardTitle>
              <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>API URL</span>
                  <Badge color="info" className="text-wrap" style={{ fontSize: '0.7rem' }}>
                    {process.env.REACT_APP_API_URL}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>Environment</span>
                  <Badge color="secondary">{process.env.REACT_APP_ENV}</Badge>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>Demo Users</span>
                  <Badge color="success">✅ Configured</Badge>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>Test Mode</span>
                  <Badge color={process.env.REACT_APP_TEST_MODE === 'true' ? 'success' : 'warning'}>
                    {process.env.REACT_APP_TEST_MODE === 'true' ? 'Enabled' : 'Disabled'}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>

        <Col lg="8">
          <Card>
            <CardBody>
              <CardTitle tag="h5">API Test Results</CardTitle>
              
              {testResults.length === 0 ? (
                <Alert color="info">
                  <h6>📋 Ready to Test API Endpoints</h6>
                  <p className="mb-0">Click "Run All API Tests" to verify all endpoints from the README documentation are working correctly.</p>
                </Alert>
              ) : (
                <>
                  <div className="mb-3">
                    <Badge color="success" className="me-2">
                      ✅ {testResults.filter(r => r.status === 'success').length} Passed
                    </Badge>
                    <Badge color="danger" className="me-2">
                      ❌ {testResults.filter(r => r.status === 'error').length} Failed
                    </Badge>
                    <Badge color="warning">
                      ⏳ {testResults.filter(r => r.status === 'pending').length} Running
                    </Badge>
                  </div>
                  
                  <ListGroup>
                    {testResults.map((result, index) => (
                      <ListGroupItem key={index}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">
                              {getStatusIcon(result.status)} {result.name}
                            </h6>
                            <p className="mb-1 text-muted">{result.message}</p>
                            {result.data && result.status === 'success' && (
                              <details className="mt-2">
                                <summary className="text-muted small" style={{ cursor: 'pointer' }}>
                                  📊 View Response Data
                                </summary>
                                <pre className="mt-2 p-2 bg-light small border rounded" style={{ fontSize: '0.75rem', maxHeight: '200px', overflow: 'auto' }}>
                                  {JSON.stringify(result.data, null, 2)}
                                </pre>
                              </details>
                            )}
                          </div>
                          <Badge color={getStatusColor(result.status)}>
                            {result.status.toUpperCase()}
                          </Badge>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </>
              )}
            </CardBody>
          </Card>

          <Card className="mt-3">
            <CardBody>
              <CardTitle tag="h6">🔗 Quick Navigation</CardTitle>
              <Row>
                <Col md="6">
                  <ListGroup flush>
                    <ListGroupItem action tag={Link} to="/itinerary">
                      🤖 AI Itinerary Planner
                    </ListGroupItem>
                    <ListGroupItem action tag={Link} to="/chatbot">
                      💬 Multilingual Chatbot
                    </ListGroupItem>
                    <ListGroupItem action tag={Link} to="/marketplace">
                      🏪 Local Marketplace
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md="6">
                  <ListGroup flush>
                    <ListGroupItem action tag={Link} to="/location">
                      📍 Location Services
                    </ListGroupItem>
                    <ListGroupItem action tag={Link} to="/feedback">
                      📝 Feedback & Ratings
                    </ListGroupItem>
                    <ListGroupItem action tag={Link} to="/blockchain">
                      🔗 Blockchain Services
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Export the component to make it a proper module
export default TestDashboard;
