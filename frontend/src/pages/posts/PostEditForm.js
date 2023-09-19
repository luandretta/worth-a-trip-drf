// React / Router
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
// Styles
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

// Component that includes the form for editing/updating posts
// Includes error handling for input fields

function PostEditForm() {
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Setting the initial state of the post data object
  const [postData, setPostData] = useState({
    title: "",
    country: "",
    location: "",
    content: "",
    image: "",
    trip_type: "unknown",
  });
  const { title, country, location, content, image, trip_type } = postData;

  const imageInput = useRef(null);
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // get id from the URL parameter
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const {
          title,
          country,
          location,
          content,
          image,
          trip_type,
          is_owner,
        } = data;
        // If the user is not the owner of the post, redirect to the home page
        is_owner
          ? setPostData({
              title,
              country,
              location,
              content,
              image,
              trip_type,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  // Handle input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("content", content);
    formData.append("trip_type", trip_type);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      // Submit updated formdata to the API
      await axiosReq.put(`/posts/${id}/`, formData);
      // Redirect to the updated post page
      history.push(`/posts/${id}`);
      // Show success notification
      NotificationManager.success("Post updated successfully", "Success!");
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // Show error notification
        NotificationManager.error(
          "There was an issue updating your post",
          "Error"
        );
      }
    }
  };

  // Text input fields
  const textFields = (
    <div className="text-center" md={5}>
      <Form.Group>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display any title errors */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Row>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="country">Country</Form.Label>
            <Form.Control
              as="select"
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleChange}
            >
              <option value="">Choose one</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="location">Location</Form.Label>
            <Form.Control
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.location?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="trip_type">Trip type</Form.Label>
            <Form.Control
              as="select"
              type="text"
              id="triy_type"
              name="trip_type"
              value={trip_type}
              onChange={handleChange}
            >
              <option value="unknown">Choose one</option>
              <option value="adventure">Adventure</option>
              <option value="consumption">Consumption</option>
              <option value="cultural">Cultural</option>
              <option value="gastronomic">Gastronomic</option>
              <option value="nautical">Nautical</option>
              <option value="relax">Relax</option>
              <option value="religious">Religious</option>
              <option value="romantic">Romantic</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <Form.Label htmlFor="content">
          Share more important information
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          id="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display any about errors */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
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
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center" lg={10}>
              <figure>
                <Image
                  className={appStyles.Image}
                  src={image}
                  alt="User image"
                  rounded
                />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Display any image errors */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
