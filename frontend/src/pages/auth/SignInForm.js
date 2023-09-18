import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// API
import axios from "axios";
// Contexts
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// Hooks
import { useRedirect } from "../../hooks/useRedirect";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  // Using the useSetCurrentUser hook to set the current user
  const setCurrentUser = useSetCurrentUser();
  // Destructured the useState hook with signInData and setSignInData
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  // Destructured username and password from signInData
  const { username, password } = signInData;
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Using the useRedirect hook to redirect if the user is already logged in
  useRedirect("loggedIn");

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending a post request to the backend with the signInData object
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // Setting the current user with the data returned from the backend
      setCurrentUser(data.user);
      // Extract expiry date for the access token & save to users local storage
      setTokenTimestamp(data);
      // Navigating to the previous page in the navigation history
      history.goBack();
      // Displaying a success notification to the user
      NotificationManager.success(
        "Welcome " + username + ". You are now signed in",
        "Success!"
      );
    } catch (err) {
      setErrors(err.response?.data);
      // Displaying an error notification to the user
      NotificationManager.error("There was an issue logging you in", "Error");
    }
  };

  // Handling input changes and updating the signInData object
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      // Triming any whitespace
      [event.target.name]: event.target.value.trim(),
    });
  };

  return (
    <div className="d-flex justify-content-center flex-row mb-3">
      <Row className={styles.Row}>
        <Col md={6} className={`my-auto p-2 ${styles.SignInCol}`}>
          <Image
            className={`${appStyles.FillerImage}`}
            src={
              "https://res.cloudinary.com/dtqse76ok/image/upload/v1691584858/Worth_a_trip2_1_hkv703.png"
            }
            alt="Rock beach"
          />
        </Col>

        <Col className="my-auto py-2 p-2" md={6}>
          <Container className={`${appStyles.Content} p-4 `}>
            <h1 className={styles.Header}>sign in</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none" htmlFor="title">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  className={styles.Input}
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Displaying username errors */}
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password">
                <Form.Label className="d-none" htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={styles.Input}
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Displaying password errors */}
              {errors.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit"
              >
                Sign In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default SignInForm;
