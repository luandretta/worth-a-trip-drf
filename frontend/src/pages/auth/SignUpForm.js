import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// API
import axios from "axios";
// Hooks
import { useRedirect } from "../../hooks/useRedirect";
// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

// Notifications
import { NotificationManager } from "react-notifications";

const SignUpForm = () => {
  // Redirect if the user is already logged in
  useRedirect("loggedIn");

  // Setting the initial state of the signUpData object with empty strings for the username and passwords
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  // Destructuring the values from the signUpData object
  const { username, password1, password2 } = signUpData;

  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});

  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  // Handling input changes and updating the signUpData objec
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      // Triming any whitespace
      [event.target.name]: event.target.value.trim(),
    });
  };
  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      NotificationManager.success("Well done! Account created successfully", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
      NotificationManager.error("There was an issue with sign up", "Error");
    }
  };

  return (
    <div className="d-flex justify-content-center flex-row mb-3">
      <Row className={styles.Row}>
        <Col md={6} className={`my-auto p-2 ${styles.SignUpCol}`}>
          <Image
            className={`${appStyles.FillerImage}`}
            src={
              "https://res.cloudinary.com/dtqse76ok/image/upload/v1691584889/Worth_a_trip2_3_hcnbw2.png"
            }
            alt="alp"
          />
        </Col>
        <Col className="my-auto py-2 p-2" md={6}>
          <Container className={`${appStyles.Content} p-4 `}>
            <h1 className={styles.Header}>sign up</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  required
                  type="checkbox"
                  label="By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. Your data won't be shared."
                />
              </Form.Group>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit"
              >
                Sign up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signin">
              Already have an account? <span>Sign in</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpForm;
