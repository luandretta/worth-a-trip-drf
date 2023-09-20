// React / Router
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import { useRedirect } from "../../hooks/useRedirect";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
// Image
import Upload from "../../assets/upload.png";
// Styles
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Component
import Asset from "../../components/Asset";
// Notifications
import { NotificationManager } from "react-notifications";
// React components
import { Rating } from "react-simple-star-rating";


// Component used for creating a post
// Takes input from the user in the forms and post it to the API
// Includes error handling that shows an alert to the user

function PostCreateForm() {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Setting the initial state of the postData object with empty strings
  const [postData, setPostData] = useState({
    title: "",
    country: "",
    location: "",
    content: "",
    image: "",
    trip_type: "unknown",
    local_security: 0,
    infrastructure: 0,
    local_population: 0,
    local_access: 0
  });
  // Destructuring the values  from the postData object
  const {
    title,
    country,
    location,
    content,
    image,
    trip_type,
  } = postData;

  // Setting the initial rating value
  const [local_access, setLocal_access] = useState(0);
  const [infrastructure, setInfrastructure] = useState(0);
  const [local_security, setLocal_security] = useState(0);
  const [local_population, setLocal_population] = useState(0);
  

  // Catch Rating value
  const handleRating1 = (rate) => {
    setLocal_access(rate);
  };
  const handleRating2 = (rate) => {
    setInfrastructure(rate);
  };
  const handleRating3 = (rate) => {
    setLocal_security(rate);
  };
  const handleRating4 = (rate) => {
    setLocal_population(rate);
  };

  const imageInput = useRef(null);
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  // Handling input changes and updating the postData object
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Functionality to change the image
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("trip_type", trip_type);
    formData.append("local_access", local_access);
    formData.append("infrastructure", infrastructure);
    formData.append("local_security", local_security);
    formData.append("local_population", local_population);
    // Append the data and request the post request from the API
    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
      // Display success notification
      NotificationManager.success("Post created successfully", "Success!");
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // Display error notification
        NotificationManager.error(
          "There was an issue adding your post",
          "Error"
        );
      }
    }
  };

  // Text Fields
  const textFields = (
    <div className="text-center" md={5}>
      <Form.Group>
        <Form.Label>
          <h5>Title</h5>
        </Form.Label>
        <Col>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>
      {/* Displaying any title errors */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            type="text"
            id="country"
            name="country"
            value={country.name}
            onChange={handleChange}
          >
            <option value={[country.name]}>Choose one</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          {/* Displaying any about errors */}
          {errors?.location?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Trip type</Form.Label>
          <Form.Control
            as="select"
            type="text"
            id="trip_type"
            name="trip_type"
            value={trip_type}
            onChange={handleChange}
          >
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
      </Form.Row>

      <div className="text-center" md={5}>
        <h5>Rate:</h5>
        <Row className="justify-content-md-center m-1 mt-1" as={Col}>
          <Card.Text>
            Local access:
            <Rating onClick={handleRating1} />
          </Card.Text>
        </Row>
        <Row className="justify-content-md-center m-1" as={Col}>
          <Card.Text>
            Infrastructure:
            <Rating onClick={handleRating2} />
          </Card.Text>
        </Row>
        <Row className="justify-content-md-center m-1" as={Col}>
          <Card.Text>
            Local security:
            <Rating onClick={handleRating3}/>
          </Card.Text>
        </Row>
        <Row className="justify-content-md-center m-1" as={Col}>
          <Card.Text>
            Local population:
            <Rating onClick={handleRating4}/>
          </Card.Text>
        </Row>
      </div>

      <Form.Group>
        <Form.Label className="mt-2">
          <h5>Share more important information</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          id="content"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying any about errors */}
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
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center text-center mt-3`}
          >
            <h5>Create your own post!</h5>
            <Form.Group className="text-center" lg={10}>
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Displaying any errors with the image */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
