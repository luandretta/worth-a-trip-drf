// React / Router
import React from "react";
import { useHistory, useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

// Component to confirm a post deletion

function PostDelete() {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // get id from the URL parameter
  const { id } = useParams();

  // Handle deleting a post
  const handleDelete = async () => {
    try {
      // Send a request to delete a post by its ID
      await axiosReq.delete(`/posts/${id}/`);
      history.push(`/`);
      NotificationManager.info("Post Removed");
    } catch (err) {
      NotificationManager.error(
        "There was an issue deleting your post",
        "Error"
      );
    }
  };

  return (
    <Card.Body className="justify-content-center mt-5">
      <Row  className="justify-content-center">
        <Col
          className={`${appStyles.Content}  text-center`}
          lg={8}
        >
          <h5>Are you sure you want to delete your post?</h5>
          <p className="mt-2">This action is irreversible!</p>
          <span>
            * If you're not the owner of this post you won't be able to delete
            it
          </span>
          <div>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Red} mt-3`}
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
    </Card.Body>
  );
}

export default PostDelete;
