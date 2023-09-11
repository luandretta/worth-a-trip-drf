import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_pic = currentUser?.profile_pic;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data:comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
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
          {comments.results.length ?  (
            comments.results.map(comment => (
              <p key={comment.id}>
                {comment.owner}:{comment.content}
              </p>
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
