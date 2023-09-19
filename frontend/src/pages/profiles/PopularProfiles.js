// React / Router
import React from "react";
// Context
import { useProfileData } from "../../contexts/ProfileDataContext";
// React Bootstrap components
import Container from "react-bootstrap/Container";
// Styles
import appStyles from "../../App.module.css";
// Components
import Asset from "../../components/Asset";
// Other pages
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  // Get popular profiles data from contexts
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {/* Check if the popular profiles data has been loaded */}
      {popularProfiles.results.length ? (
        <>
          <h5 className="text-center">Most followed profiles</h5>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
