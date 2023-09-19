// React / Router
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Utils
import { fetchMoreData } from "../../utils/utils";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
// Other pages
import Post from "./Post";
import PopularProfiles from "../profiles/PopularProfiles";
// Components
import Asset from "../../components/Asset";
// Images
import NoResults from "../../assets/no-results.png";

// State variables
function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Setup async function to fetch posts
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        // Set the posts state variable to the returned data
        setPosts(data);
        // Set hasLoaded state variable to true
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    // Add timer to delay the fetchPosts function by 1 second
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    // Clean up function for the useEffect hook
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {/* If posts have loaded and there are results, render infinite scroll component with Post page */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Render PopularProfiles page */}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
