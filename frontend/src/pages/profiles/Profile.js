// React / Router
import React from "react";
import { Link } from "react-router-dom";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
// Styles
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
//Components
import Avatar from "../../components/Avatar";
// React Bootstrap components
import Button from "react-bootstrap/Button";

const Profile = (props) => {
  // Destructure props object
  const { profile, mobile} = props;
  const { id, following_id, profile_pic, owner } = profile;
  // Get current user from context
  const currentUser = useCurrentUser();
  // Determine if current user is the owner of this profile
  const is_owner = currentUser?.username === owner;
  // Get follow/unfollow functions from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        {/* Link to the profile page */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={profile_pic} height={40}  alt={owner.profile}/>
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        {/* Owner's username */}
        <strong>{owner}</strong>
      </div>
      {/* Follow/unfollow buttons */}
      <div className={`align-self-center ${!mobile && "ml-auto"}`}>
        {/* Show the button only if the current user is not the owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
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
      </div>
    </div>
  );
};

export default Profile;
