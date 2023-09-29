// React / Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
// Utils
import { fetchMoreData } from "../../utils/utils";
// React Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// Styles
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Other Pages
import PopularProfiles from "./PopularProfiles";
import Post from "../posts/Post";
// Components
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// Images
import NoResults from "../../assets/no-results.png";
// JavaScript library
import dayjs from "dayjs";
// Notifications
import { NotificationManager } from "react-notifications";

function ProfilePage() {
  // Set state variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // get id from the URL parameter
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  // Determine if the current user is the owner of the profile
  const is_owner = currentUser?.username === profile?.owner;
  const date = profile?.birth_date;
  // pass the date to format function, specify a format
  const shortDateFormat = dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            // Retrieve the profile id & posts created by the user from the API
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        // Update state
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row>
        <Col>
          <Image
            className={styles.BackgroundImage}
            fluid
            rounded
            src={profile?.bg_pic}
          />
        </Col>
      </Row>
      {/* If the user is the owner of the profile display ProfileEditDropdown component */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row className="px-3 text-center">
        <Col className="justify-content-center" lg={12}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.profile_pic}
            alt="profile picture"
          />
        </Col>
      </Row>
      <div>
        <Row noGutters className="px-3 justify-content-md-center">
          <Col className="text-center">
            {profile?.name ? (
              <h3 className="m-2">{profile?.name}</h3>
            ) : (
              <h3 className="m-2">{profile?.owner}</h3>
            )}
            {profile?.bio && <p>{profile?.bio}</p>}
            {profile?.birth_date && <p>Birthdate: {shortDateFormat}</p>}
            {profile?.location && <p>Location: {profile?.location}</p>}
          </Col>
        </Row>
      </div>
      <Row className="justify-content-md-center no-gutters">
        <Col md="auto" className="m-2 text-center">
          {/* Owner's posts count */}
          <div>{profile?.posts_count}</div>
          <div>posts </div>
        </Col>
        <Col md="auto" className="m-2 text-center">
          {/* Owner's followers count */}
          <div>{profile?.followers_count}</div>
          <div>followers</div>
        </Col>
        <Col md="auto" className="m-2 text-center">
          {/* Owner's following count */}
          <div>{profile?.following_count}</div>
          <div>following</div>
        </Col>
      </Row>
      {/* Follow/unfollow buttons */}
      <Row className="justify-content-md-center no-gutters">
        <Col md="auto" className="m-2 text-center">
          {/* Show the button only if the current user is not the owner */}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlueOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <h5 className="text-center">{profile?.owner}'s posts</h5>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
