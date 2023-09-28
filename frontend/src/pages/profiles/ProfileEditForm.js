// React / router
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

const ProfileEditForm = () => {
  // Get current user from contexts
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  // get id from the URL parameter
  const { id } = useParams();
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  const imageFile = useRef();
  const backgroundFile = useRef();
  // Setting the initial state of the profileData object with empty strings
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    birth_date: "",
    location: "",
    profile_pic: "",
    bg_pic: "",
  });
  // Destructuring the values from the profileData object
  const { name, bio, birth_date, location, profile_pic, bg_pic } = profileData;
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      // If the current user is logged in
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, birth_date, location, profile_pic, bg_pic } = data;
          setProfileData({
            name,
            bio,
            birth_date,
            location,
            profile_pic,
            bg_pic,
          });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);
  // Handling input changes and updating the profileData object
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("birth_date", birth_date);
    formData.append("location", location);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_pic", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_pic: data.profile_pic,
      }));
      // history.push(`/profiles/${id}/`);
      history.goBack();    
      // Display success notification
      NotificationManager.success("Profile Updated", "Success!");

    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
      // Display error notification
      NotificationManager.error(
        "There was an issue updating your profile",
        "Error"
      );
    }

    if (backgroundFile?.current?.files[0]) {
      formData.append("bg_pic", backgroundFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        bg_pic: data.bg_pic,
      }));
      // history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          as="textarea"
          value={name}
          onChange={handleChange}
          name="name"
          rows={1}
          aria-label="name"
          required
        />
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Label className="mt-2">Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={7}
        />
        {errors?.bio?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Label className="mt-2">Location</Form.Label>
        <Form.Control
          as="textarea"
          value={location}
          onChange={handleChange}
          name="location"
          rows={1}
        />
        {errors?.location?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Label className="mt-2">Birthdate</Form.Label>
        <Form.Control
          type="date"
          name="birth_date"
          placeholder="birth_date"
          value={birth_date}
          onChange={handleChange}
        />
        {errors?.birth_date?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center mt-4" md={7}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {bg_pic && (
                <figure>
                  <Image src={bg_pic} fluid />
                </figure>
              )}
              {errors?.bg_pic?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="bg_pic-upload"
                >
                  Change your background image
                </Form.Label>
              </div>
              <Form.File
                id="bg_pic-upload"
                ref={backgroundFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      bg_pic: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <Form.Group>
              {profile_pic && (
                <figure>
                  <Image src={profile_pic} fluid />
                </figure>
              )}
              {errors?.profile_pic?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="profile_pic-upload"
                >
                  Change your profile image
                </Form.Label>
              </div>
              <Form.File
                id="profile_pic-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profile_pic: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none ">{textFields}</div>
          </Container>
        </Col>
        <Col className="d-none d-md-block p-0 p-md-2 mt-4 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
