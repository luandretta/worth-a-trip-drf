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
    local_access: 0,
  });
  // Destructuring the values  from the postData object
  const { title, country, location, content, image, trip_type } = postData;

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
        <Form.Label htmlFor="post-title">
          <h5>Post Title</h5>
        </Form.Label>
        <Col>
          <Form.Control
            type="text"
            id="post-title"
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
      <Row>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="post-country">Country</Form.Label>
            <Form.Control
              as="select"
              id="post-country"
              name="country"
              value={country}
              onChange={handleChange}
              rows={7}
            >
              <option value="">Choose country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire, Sint Eustatius and Saba">
                Bonaire, Sint Eustatius and Saba
              </option>
              <option value="Bosnia and Herzegovina">
                Bosnia and Herzegovina
              </option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Congo">Congo</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="North Korea">Korea, North</option>
              <option value="South Korea">Korea, South</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Mexico">Mexico</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Nigeria">Nigeria</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="San Marino">San Marino</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Togo">Togo</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States of America">
                United States of America
              </option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </Form.Control>
          </Form.Group>
          {/* Displaying any country errors */}
          {errors?.country?.map((message, idx) => (
            <Alert variant="danger" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="city">City</Form.Label>
            <Form.Control
              type="text"
              id="city"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Displaying any about errors */}
          {errors?.location?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col sm={4}>
          <Form.Group>
            <Form.Label htmlFor="trip-type">Trip type</Form.Label>
            <Form.Control
              as="select"
              type="text"
              id="trip_type"
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
          {/* Displaying any trip_type errors */}
          {errors?.trip_type?.map((message, idx) => (
            <Alert variant="danger" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
      <div className="text-center mt-2" md={5}>
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
            <Rating onClick={handleRating3} />
          </Card.Text>
        </Row>
        <Row className="justify-content-md-center m-1" as={Col}>
          <Card.Text>
            Local population:
            <Rating onClick={handleRating4} />
          </Card.Text>
        </Row>
      </div>

      <Form.Group>
        <Form.Label htmlFor="post-content" className="mt-4">
          <h5>Share more important information</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          id="post-content"
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
        className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
        type="submit"
      >
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 mt-3" md={10} lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center text-center mt-3`}
          >
            <h3 className="mt-2">Create your own post!</h3>
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

            <div >{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
