import React from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component to confirm deletion

function PostDelete() {
  const history = useHistory();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}/`);
      history.push(`/`);
    } catch (err) {
      // console.log(err);
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
