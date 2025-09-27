import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tourismService } from '../../services/tourismService';
import { ItineraryRequest, ItineraryResponse } from '../../types';
import toast from 'react-hot-toast';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  Alert,
} from 'reactstrap';
import {
  FaMap,
  FaDollarSign,
  FaCalendar,
  FaHeart,
  FaMagic,
  FaCheckCircle,
} from 'react-icons/fa';

// Use a dedicated form values type to avoid intersecting string[] with string
 type FormValues = Omit<ItineraryRequest, 'interests'> & { interests: string };

const ItineraryPlanner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const selectedInterests = watch('interests')?.split(',').filter(Boolean) || [];

  const interestOptions = [
    'adventure',
    'culture',
    'nature',
    'wildlife',
    'religious',
    'photography',
    'food',
    'history',
  ];

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const request: ItineraryRequest = {
        budget: data.budget,
        durationDays: data.durationDays,
        interests: selectedInterests,
        preferredLocation: data.preferredLocation,
        accommodationType: data.accommodationType,
        transportPreference: data.transportPreference,
      };

      const response = await tourismService.planItinerary(request);
      setItinerary(response);
      toast.success('Itinerary generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = selectedInterests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    setValue('interests', newInterests.join(','));
  };

  // Properly map register to Reactstrap Input for controlled binding
  const budgetReg = register('budget', {
    required: 'Budget is required',
    min: { value: 1000, message: 'Minimum budget is ₹1,000' },
    valueAsNumber: true,
  });
  const durationReg = register('durationDays', {
    required: 'Duration is required',
    min: { value: 1, message: 'Minimum duration is 1 day' },
    max: { value: 30, message: 'Maximum duration is 30 days' },
    valueAsNumber: true,
  });

  const preferredLocationReg = register('preferredLocation');
  const accommodationTypeReg = register('accommodationType');
  const transportPreferenceReg = register('transportPreference');
  const interestsReg = register('interests');

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <div className="d-flex justify-content-center mb-4">
              <FaMagic className="text-primary" style={{ fontSize: '3rem' }} />
            </div>
            <h1 className="display-4 fw-bold mb-4">
              AI-Powered Itinerary Planner
            </h1>
            <p className="lead text-muted">
              Tell us your preferences and let our AI create the perfect itinerary for your Jharkhand adventure
            </p>
          </Col>
        </Row>

        <Row>
          {/* Form Section */}
          <Col lg={6} className="mb-4">
            <Card>
              <CardBody>
                <h2 className="h3 fw-bold mb-4">
                  Your Travel Preferences
                </h2>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="budget">
                          <FaDollarSign className="me-1" />
                          Budget (₹)
                        </Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="Enter your budget"
                          name={budgetReg.name}
                          onChange={budgetReg.onChange}
                          onBlur={budgetReg.onBlur}
                          innerRef={budgetReg.ref}
                          invalid={!!errors.budget}
                        />
                        {errors.budget && (
                          <div className="text-danger small mt-1">{errors.budget.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="durationDays">
                          <FaCalendar className="me-1" />
                          Duration (Days)
                        </Label>
                        <Input
                          id="durationDays"
                          type="number"
                          placeholder="Number of days"
                          name={durationReg.name}
                          onChange={durationReg.onChange}
                          onBlur={durationReg.onBlur}
                          innerRef={durationReg.ref}
                          invalid={!!errors.durationDays}
                        />
                        {errors.durationDays && (
                          <div className="text-danger small mt-1">{errors.durationDays.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label>
                      <FaHeart className="me-1" />
                      Interests
                    </Label>
                    <div className="row g-2">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="col-6">
                          <Button
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            color={selectedInterests.includes(interest) ? 'primary' : 'outline-secondary'}
                            size="sm"
                            className="w-100"
                          >
                            {interest.charAt(0).toUpperCase() + interest.slice(1)}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Input
                      type="hidden"
                      name={interestsReg.name}
                      onChange={interestsReg.onChange}
                      onBlur={interestsReg.onBlur}
                      innerRef={interestsReg.ref}
                    />
                  </FormGroup>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="preferredLocation">
                          <FaMap className="me-1" />
                          Preferred Location
                        </Label>
                        <Input
                          id="preferredLocation"
                          type="select"
                          name={preferredLocationReg.name}
                          onChange={preferredLocationReg.onChange}
                          onBlur={preferredLocationReg.onBlur}
                          innerRef={preferredLocationReg.ref}
                        >
                          <option value="">Select a location</option>
                          <option value="Ranchi">Ranchi</option>
                          <option value="Jamshedpur">Jamshedpur</option>
                          <option value="Dhanbad">Dhanbad</option>
                          <option value="Netarhat">Netarhat</option>
                          <option value="Hazaribagh">Hazaribagh</option>
                          <option value="Betla">Betla National Park</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="accommodationType">Accommodation Type</Label>
                        <Input
                          id="accommodationType"
                          type="select"
                          name={accommodationTypeReg.name}
                          onChange={accommodationTypeReg.onChange}
                          onBlur={accommodationTypeReg.onBlur}
                          innerRef={accommodationTypeReg.ref}
                        >
                          <option value="">Select accommodation type</option>
                          <option value="budget">Budget</option>
                          <option value="mid-range">Mid-range</option>
                          <option value="luxury">Luxury</option>
                          <option value="homestay">Homestay</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="transportPreference">Transport Preference</Label>
                    <Input
                      id="transportPreference"
                      type="select"
                      name={transportPreferenceReg.name}
                      onChange={transportPreferenceReg.onChange}
                      onBlur={transportPreferenceReg.onBlur}
                      innerRef={transportPreferenceReg.ref}
                    >
                      <option value="">Select transport preference</option>
                      <option value="public">Public Transport</option>
                      <option value="private">Private Vehicle</option>
                      <option value="mixed">Mixed</option>
                    </Input>
                  </FormGroup>

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="loading-spinner me-2"></div>
                        Generating Itinerary...
                      </div>
                    ) : (
                      <>
                        <FaMagic className="me-2" />
                        Generate My Itinerary
                      </>
                    )}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* Results Section */}
          <Col lg={6}>
            {itinerary && (
              <>
                {/* Itinerary Overview */}
                <Card className="mb-4">
                  <CardBody>
                    <h3 className="h4 fw-bold mb-4">
                      Your Personalized Itinerary
                    </h3>
                    <Row>
                      <Col md={6} className="mb-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded">
                          <div className="text-primary small fw-medium">Estimated Cost</div>
                          <div className="h3 fw-bold text-primary">
                            ₹{itinerary.estimatedCost.toLocaleString()}
                          </div>
                        </div>
                      </Col>
                      <Col md={6} className="mb-3">
                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                          <div className="text-warning small fw-medium">Duration</div>
                          <div className="h3 fw-bold text-warning">
                            {itinerary.durationDays} Days
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* Recommended Places */}
                <Card className="mb-4">
                  <CardBody>
                    <h3 className="h5 fw-bold mb-3">
                      Recommended Places
                    </h3>
                    <div>
                      {itinerary.recommendedPlaces.map((place, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <FaCheckCircle className="text-success me-2" />
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Recommended Activities */}
                <Card className="mb-4">
                  <CardBody>
                    <h3 className="h5 fw-bold mb-3">
                      Recommended Activities
                    </h3>
                    <div>
                      {itinerary.recommendedActivities.map((activity, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <FaCheckCircle className="text-primary me-2" />
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Detailed Plan */}
                <Card className="mb-4">
                  <CardBody>
                    <h3 className="h5 fw-bold mb-3">
                      Detailed Itinerary
                    </h3>
                    <div className="bg-light p-3 rounded">
                      <pre className="mb-0 small" style={{ whiteSpace: 'pre-wrap' }}>
                        {itinerary.generatedPlan}
                      </pre>
                    </div>
                  </CardBody>
                </Card>

                {/* Suggestions */}
                <Card className="mb-4">
                  <CardBody>
                    <h3 className="h5 fw-bold mb-3">
                      Additional Suggestions
                    </h3>
                    <div>
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">Accommodation</h6>
                        <p className="text-muted small mb-0">{itinerary.accommodationSuggestions}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">Transport</h6>
                        <p className="text-muted small mb-0">{itinerary.transportSuggestions}</p>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-2">Tips</h6>
                        <p className="text-muted small mb-0">{itinerary.tips}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}

            {!itinerary && !isLoading && (
              <Card className="text-center">
                <CardBody className="py-5">
                  <FaMagic className="text-muted mb-4" style={{ fontSize: '4rem' }} />
                  <h3 className="h5 fw-bold mb-2">
                    Ready to Plan Your Trip?
                  </h3>
                  <p className="text-muted">
                    Fill out the form to get your personalized AI-generated itinerary
                  </p>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItineraryPlanner;
