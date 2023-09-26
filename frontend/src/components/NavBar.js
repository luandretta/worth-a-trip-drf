// React / Router
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// API
import axios from "axios";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
// Utils
import { removeTokenTimestamp } from "../utils/utils";
// React Bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// Styles
import styles from "../styles/NavBar.module.css";
import btnStyles from "../styles/Button.module.css";
// Images
import logo from "../assets/logo.png";
// Components
import Avatar from "./Avatar";
// Hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
// Notifications
import { NotificationManager } from "react-notifications";

const NavBar = () => {
  // Get the current user from the CurrentUserContext
  const currentUser = useCurrentUser();
  // Getting the setCurrentUser function from the CurrentUserContext
  const setCurrentUser = useSetCurrentUser();
  // using the custom hook 'UseOutsideClickToggle', which handles toggling the state
  // based on clicks outside of the specified element.
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // State for controlling the sign out confirmation modal
  const [show, setShow] = useState(false);
  // Handler for closing the sign out confirmation modal
  const handleClose = () => setShow(false);
  // Handler for opening the sign out confirmation modal
  const handleShow = () => setShow(true);

  const handleSignOut = async () => {
    try {
      // Sending a POST request to log the user out
      await axios.post("dj-rest-auth/logout/");
      // Setting the current user to null to log them out
      setCurrentUser(null);
      // Remove local storage timestamp
      removeTokenTimestamp();
      // Show a success notification
      NotificationManager.info("You are now signed out");
      // Close the Model
      setShow(false);
    } catch (err) {
      // console.log(err);
      // Show an error notification if there was an issue with sign out
      NotificationManager.error("There was an issue signing you out", "Error");
    }
  };
  // Add post icon
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fas fa-plus-circle"></i>Add post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-rss"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/whished"
      >
        <i className="fas fa-bookmark"></i>Bookmarks
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_pic} text="Profile" height={35} />
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleShow}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact"
      >
        <i className="fas fa-envelope"></i>Contact us
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="70"  className={styles.Title} />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* Modal for sign out confirmation */}
      <Modal show={show} onHide={handleClose} className="justify-content-center">
        <Modal.Header closeButton>
          <Modal.Title>
              <h4 className="text-center ml-1">Sign Out</h4>
          </Modal.Title>
        </Modal.Header>
        <div className="ml-3">
          Are you sure you want to sign out?
        </div>
        <Modal.Footer className="justify-content-center">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Red}`}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavBar;
