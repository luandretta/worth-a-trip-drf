import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosReq } from "../../api/axiosDefaults";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ContactCreateForm.module.css";

const ContactCreateForm = () => {
  const history = useHistory();
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});
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
    } catch (err) {
      setErrors(err.response?.data);
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
        <Form.Label htmlFor="message">Message</Form.Label>
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
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center mt-5`} lg={8}
      >
        <Col className="text-center" >
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
