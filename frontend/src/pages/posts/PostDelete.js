import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component that includes the form for editing/updating posts
// Includes error handling for input fields

function PostDelete() {
  // const currentUser = useCurrentUser();
  // check if currentUser is the owner of the post
  // const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}/`);
      history.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card.Body className="justify-content-center">
      <Row>
        <Col
          className={`${appStyles.Content} py-2 p-0 p-md-4   text-center`}
          md={7}
          lg={8}
        >
          <h5>Are you sure you want to delete your post?</h5>
          <p>This action is irreversible!</p>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue} mt-4`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Red} mt-4`}
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
}

export default PostDelete;
