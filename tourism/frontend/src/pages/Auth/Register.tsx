import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { RegisterRequest } from '../../types';
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
} from 'reactstrap';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setError, clearError } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest & { confirmPassword: string }>();

  const password = watch('password');

  const onSubmit = async (data: RegisterRequest & { confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Properly map register to Reactstrap Input for controlled binding
  const nameReg = register('name', {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
  });
  const emailReg = register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  });
  const phoneReg = register('phoneNumber');
  const roleReg = register('role', { required: 'Please select an account type' });
  const passwordReg = register('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' },
  });
  const confirmPasswordReg = register('confirmPassword', {
    required: 'Please confirm your password',
    validate: (value) => value === password || 'Passwords do not match',
  });

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="text-white fw-bold fs-3">J</span>
                  </div>
                  <h2 className="fw-bold">Create your account</h2>
                  <p className="text-muted">
                    Or{' '}
                    <Link to="/login" className="text-primary text-decoration-none">
                      sign in to your existing account
                    </Link>
                  </p>
                </div>

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          name={nameReg.name}
                          onChange={nameReg.onChange}
                          onBlur={nameReg.onBlur}
                          innerRef={nameReg.ref}
                          invalid={!!errors.name}
                        />
                        {errors.name && (
                          <div className="text-danger small mt-1">{errors.name.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          name={emailReg.name}
                          onChange={emailReg.onChange}
                          onBlur={emailReg.onBlur}
                          innerRef={emailReg.ref}
                          invalid={!!errors.email}
                        />
                        {errors.email && (
                          <div className="text-danger small mt-1">{errors.email.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="phoneNumber">Phone Number (Optional)</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="Enter your phone number"
                          name={phoneReg.name}
                          onChange={phoneReg.onChange}
                          onBlur={phoneReg.onBlur}
                          innerRef={phoneReg.ref}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="role">Account Type</Label>
                        <Input
                          id="role"
                          type="select"
                          name={roleReg.name}
                          onChange={roleReg.onChange}
                          onBlur={roleReg.onBlur}
                          innerRef={roleReg.ref}
                          invalid={!!errors.role}
                        >
                          <option value="">Select account type</option>
                          <option value="TOURIST">Tourist</option>
                          <option value="GUIDE">Guide</option>
                        </Input>
                        {errors.role && (
                          <div className="text-danger small mt-1">{errors.role.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <div className="position-relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            name={passwordReg.name}
                            onChange={passwordReg.onChange}
                            onBlur={passwordReg.onBlur}
                            innerRef={passwordReg.ref}
                            invalid={!!errors.password}
                          />
                          <Button
                            type="button"
                            color="link"
                            className="position-absolute end-0 top-50 translate-middle-y pe-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        {errors.password && (
                          <div className="text-danger small mt-1">{errors.password.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          name={confirmPasswordReg.name}
                          onChange={confirmPasswordReg.onChange}
                          onBlur={confirmPasswordReg.onBlur}
                          innerRef={confirmPasswordReg.ref}
                          invalid={!!errors.confirmPassword}
                        />
                        {errors.confirmPassword && (
                          <div className="text-danger small mt-1">{errors.confirmPassword.message}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    color="primary"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="loading-spinner me-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center text-muted small">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-primary text-decoration-none">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary text-decoration-none">
                    Privacy Policy
                  </a>
                  .
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
