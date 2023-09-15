import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const backgroundFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    birth_date: "",
    location: "",
    profile_pic: "",
    bg_pic: "",
  });
  const { name, bio, birth_date, location, profile_pic, bg_pic } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
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

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

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
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
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
      history.goBack();
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
        />
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Label mt-2>Bio</Form.Label>
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

        <Form.Label>Location</Form.Label>
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

       
        <Form.Label>Birthdate</Form.Label>
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
        <Col className="py-2 p-0 p-md-2 text-center" md={7}>
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
                roundedCircle
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
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
