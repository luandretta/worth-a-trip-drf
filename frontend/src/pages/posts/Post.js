// React / Router
import React from "react";
import { Link, useHistory } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Media from "react-bootstrap/Media";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// Styles
import styles from "../../styles/Post.module.css";
// Components
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
// Notifications
import { NotificationManager } from "react-notifications";

const Post = (props) => {
  // Destructure the props object
  const {
    id,
    owner,
    profile_id,
    profile_pic,
    likes_count,
    like_id,
    comments_count,
    wishes_count,
    wish_id,
    title,
    country,
    location,
    content,
    image,
    trip_type,
    updated_at,
    postPage,
    setPosts,
  } = props;
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Declare is_owner
  const is_owner = currentUser?.username === owner;
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  // handle post edit
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // handle post delete
  const handleDelete = () => {
    history.push(`/posts/${id}/delete`);
  };

  // handle Like posts functionality
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
      // Display success notification
      NotificationManager.success("Post Liked", "Success!");
    } catch (err) {
      // console.log(err);
      // Display error notification
      NotificationManager.error("There was an issue liking the post", "Error");
    }
  };

  // handle Delete like of posts
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
      // Display a notification
      NotificationManager.info("Post Unliked");
    } catch (err) {
      // console.log(err);
      // Display error notification
      NotificationManager.error(
        "There was an issue unliking the post",
        "Error"
      );
    }
  };

  // handle Wish posts functionality
  const handleWish = async () => {
    try {
      const { data } = await axiosRes.post("/wishes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, wishes_count: post.wishes_count + 1, wish_id: data.id }
            : post;
        }),
      }));
      // Displaying a success notification
      NotificationManager.success("Post Saved", "Success!");
    } catch (err) {
      // console.log(err);
      // Displaying a error notification
      NotificationManager.error("There was an issue saving the post", "Error");
    }
  };

  // handle Delete wish of posts
  const handleUnwish = async () => {
    try {
      await axiosRes.delete(`/wishes/${wish_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, wishes_count: post.wishes_count - 1, wish_id: null }
            : post;
        }),
      }));
      // Display a notification
      NotificationManager.info("Post Removed from Desired");
    } catch (err) {
      // console.log(err);
      // If error display error notification
      NotificationManager.error(
        "There was an issue removing the post",
        "Error"
      );
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Link to profile id of post */}
          <Link to={`/profiles/${profile_id}`}>
            {/* Display Avatar component */}
            <Avatar src={profile_pic} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
             {/* If the user is the owner of the post display PostDropdownBar component */}
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} className={styles.PostImage} />
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        <Row className="justify-content-md-center">
          <Col md="auto">
            {country && <Card.Text>Country: {country} </Card.Text>}
          </Col>
          <Col md="auto">
            {location && <Card.Text>City: {location} </Card.Text>}
          </Col>
          <Col md="auto">
            {trip_type && <Card.Text>Trip type: {trip_type}</Card.Text>}
          </Col>
        </Row>
        {content && <Card.Text className="mt-4">{content}</Card.Text>}
        <div className={styles.PostBar}>
          {/* If the user is the owner of the post display message */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Icon}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.IconOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't wish your own post!</Tooltip>}
            >
              <i className="fas fa-map-pin" />
            </OverlayTrigger>
          ) : wish_id ? (
            <span onClick={handleUnwish}>
              <i className={`fas fa-map-pin ${styles.Icon}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleWish}>
              <i className={`fas fa-map-pin ${styles.IconOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to pin posts!</Tooltip>}
            >
              <i className="fas fa-map-pin" />
            </OverlayTrigger>
          )}

          {wishes_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
