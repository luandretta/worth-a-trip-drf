// React / Router
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

const UserPasswordForm = () => {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Get id from the URL parameter
  const { id } = useParams();
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Setting the initial state of the userData object with empty strings for the new password1 and password2
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  // Destructuring the values of password1 and password2 from the userData object
  const { new_password1, new_password2 } = userData;
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});

  // Handling input changes and updating the userData object
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
      // Display success notification
      NotificationManager.success("Password Updated", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
      // Display error notification
      NotificationManager.error(
        "There was an issue updating your password",
        "Error"
      );
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center mt-5" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {/* Displaying any password1 errors */}
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {/* Displaying any password2 errors */}
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
