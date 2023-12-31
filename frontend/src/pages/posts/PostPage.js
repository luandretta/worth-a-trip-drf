// React / Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Utils
import { fetchMoreData } from "../../utils/utils";
// React Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// Styles
import appStyles from "../../App.module.css";
// Other pages
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import PopularProfiles from "../profiles/PopularProfiles";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// Components
import Asset from "../../components/Asset";
// Notifications
import { NotificationManager } from "react-notifications";

function PostPage() {
  // Get id from the URL parameter
  const { id } = useParams();
  // State for post
  const [post, setPost] = useState({ results: [] });
  // Get current user from CurrentUserContext
  const currentUser = useCurrentUser();
  // Get current user's profile picture
  const profile_pic = currentUser?.profile_pic;
  // State for comments
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    // Hook to fetch posts and comments on component mount
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        // update post state with fetched post
        setPost({ results: [post] });
        // update comments state with fetched comments
        setComments(comments);
      } catch (err) { }
    };

    handleMount();
    // Hook will re-run when the ID changes
  }, [id]);

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2 mt-4" lg={8}>
        <h3 className="text-center mt-4">Post Detail</h3>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Display PopularProfiles mobile display page */}
        <PopularProfiles mobile />
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {/* If the user is logged in, display CommentCreateForm */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profile_pic={profile_pic}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;
