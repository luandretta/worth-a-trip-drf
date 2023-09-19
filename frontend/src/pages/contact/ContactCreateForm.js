// React / Router
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// Hooks
import { useRedirect } from "../../hooks/useRedirect";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ContactCreateForm.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

const ContactCreateForm = () => {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Setting the initial state of the contactData object with empty strings for subject and message
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });
  // Destructuring the values of subject and message from the contactData object
  const { subject, message } = contactData;

  // Handling input changes and updating the formData object
  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("message", message);

    try {
      // Send a request to the backend with the formData object
      await axiosReq.post("/contact/", formData);
      history.push("/");
      // Displaying a success notification to the user
      NotificationManager.success(
        "Thank you, your message has been recieved and you will receive a reply by email ",
        "Success!"
      );
    } catch (err) {
      setErrors(err.response?.data);
      // Displaying an error notification to the user
      NotificationManager.error(
        "There was an issue sending your message",
        "Error"
      );
    }
  };

  // TextFields
  const TextFields = (
    <div className="text-center md={5}">
      <Form.Group>
        <Form.Label htmlFor="subject">Add an Enquiry:</Form.Label>
        <Form.Control
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying subject errors */}
      {errors?.subject?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label htmlFor="message">Leave your message and your email or phone number for contact</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying message errors */}
      {errors?.message?.map((message, idx) => (
        <Alert variant="danger" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Send
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center mt-5`}
        lg={8}
      >
        <Col className="text-center">
          <h2>Get In Touch</h2>
          <p>
            Have an enquery? Fill in the form bellow and we'll answer your
            question shortly
          </p>
          <div>{TextFields}</div>
        </Col>
      </Container>
    </Form>
  );
};

export default ContactCreateForm;
