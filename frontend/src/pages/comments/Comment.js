// React / Router
import React, { useState } from "react";
import { Link } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Media from "react-bootstrap/Media";
// Components
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
// Styles
import styles from "../../styles/Comment.module.css";
// Other pages
import CommentEditForm from "./CommentEditForm";
// Notifications
import { NotificationManager } from "react-notifications";

const Comment = (props) => {
  const {
    // Destructure the props object
    profile_id,
    profile_pic,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Check if the current user is the owner of the comment
  const is_owner = currentUser?.username === owner;
  // Define state variables
  const [showEditForm, setShowEditForm] = useState(false);

  // Define the function to handle comment deletion
  const handleDelete = async () => {
    try {
      // Make an API call to delete the comment by id
      await axiosRes.delete(`/comments/${id}/`);
      // Update the post state by decrementing the comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      // Update the comments state by removing the deleted comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      // Show a success notification
      NotificationManager.info("Comment Removed");
    } catch (err) {
      // Show an error notification if there was an issue deleting the comment
      NotificationManager.error(
        "There was an issue removing your comment",
        "Error"
      );
    }
  };

  return (
    <>
      <hr />
      <Media>
        {/* Link to the user's profile */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_pic} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          {/* Display the owner's name */}
          <span className={styles.Owner}>{owner}</span>
          {/* Display the comment's updated date */}
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            // If showEditForm is true, render the CommentEditForm component
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profile_pic={profile_pic}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            // If showEditForm is false, render just the comments
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Render the PostDropdownBar component if the current user is the owner of the comment */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
