import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/authService";
import { AuthRequest } from "../../types";
import toast from "react-hot-toast";
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
  Alert,
} from "reactstrap";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, setError, clearError } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>();

  const onSubmit = async (data: AuthRequest) => {
    console.log("Submitting login form with:", data);
    setIsLoading(true);
    clearError();

    try {
      const response = await authService.login(data);
      console.log("Login API response:", response);
      login(response);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (formErrors: any) => {
    console.warn("Validation errors:", formErrors);
  };

  // Properly map register onto Reactstrap Input (uses innerRef instead of ref)
  const emailReg = register("email", { required: "Email is required" });
  const passwordReg = register("password", { required: "Password is required" });

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <div
                    className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <span className="text-white fw-bold fs-3">J</span>
                  </div>
                  <h2 className="fw-bold">Sign in to your account</h2>
                  <p className="text-muted">
                    Or{" "}
                    <Link
                      to="/register"
                      className="text-primary text-decoration-none"
                    >
                      create a new account
                    </Link>
                  </p>
                </div>

                <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                  <FormGroup>
                    <Label for="email">Email address</Label>
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
                      <div className="text-danger small mt-1">
                        {errors.email.message}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <div className="position-relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
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
                      <div className="text-danger small mt-1">
                        {errors.password.message}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <Input type="checkbox" id="remember" />
                      <Label for="remember" className="form-check-label">
                        Remember me
                      </Label>
                    </div>
                    <a
                      href="#"
                      className="text-primary text-decoration-none small"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    color="primary"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="loading-spinner me-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign in
                      </>
                    )}
                  </Button>
                </Form>

                {/* Demo Credentials */}
                <Alert color="info" className="mt-4">
                  <h6 className="alert-heading">Demo Credentials:</h6>
                  <small>
                    <div>
                      <strong>Admin:</strong> admin@jharkhandtourism.com /
                      admin123
                    </div>
                    <div>
                      <strong>Guide:</strong> guide@jharkhandtourism.com /
                      guide123
                    </div>
                    <div>
                      <strong>Tourist:</strong> tourist@jharkhandtourism.com /
                      tourist123
                    </div>
                  </small>
                </Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
