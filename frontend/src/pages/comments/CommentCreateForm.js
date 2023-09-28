// React / Router
import React, { useState } from "react";
import { Link } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// Styles
import styles from "../../styles/CommentCreateEditForm.module.css";
// Components
import Avatar from "../../components/Avatar";
// Notifications
import { NotificationManager } from "react-notifications";

function CommentCreateForm(props) {
  // Destructure the props object
  const { post, setPost, setComments, profile_pic, profile_id } = props;
  // Define state variables
  const [content, setContent] = useState("");

  // Event handler for input change
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Update the comments state by adding the comment to the array
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      // Show a success notification
      NotificationManager.success("Comment created successfully", "Success!");
    } catch (err) {
      // Show an error notification if there was an issue creating the comment
      NotificationManager.error(
        "There was an issue adding your comment",
        "Error"
      );
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to the user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_pic} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button}  d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Send
      </button>
    </Form>
  );
}

export default CommentCreateForm;
