import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Media from "react-bootstrap/Media";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    likes_count,
    like_id,
    comments_count,
    wishes_count,
    wish_id,
    title,
    location,
    content,
    image,
    trip_type,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    history.push(`/posts/${id}/delete`);
  };

  // Like posts
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
    } catch (err) {
      console.log(err);
    }
  };

  // UDelete like of posts
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
    } catch (err) {
      console.log(err);
    }
  };

  // Wish posts
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
    } catch (err) {
      console.log(err);
    }
  };

  // Delete wish of posts
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
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
        <Card.Img src={image} alt={title} />
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        <Row className="justify-content-md-center">
          <Col md="auto">
            {location && <Card.Text>Local: {location} </Card.Text>}
          </Col>
          <Col md="auto">
            {trip_type && <Card.Text>Trip type: {trip_type}</Card.Text>}
          </Col>
        </Row>
        {content && <Card.Text className="mt-4">{content}</Card.Text>}
        <div className={styles.PostBar}>
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
