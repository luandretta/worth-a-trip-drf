// Readt
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// Images
import NoResults from "../assets/not-found.jpg";
// React Bootstrap components
import Button from "react-bootstrap/Button";
// Styles
import styles from "../styles/NotFound.module.css";
import btnStyles from "../styles/Button.module.css";
// Components
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className="text-center">
      <Asset
        className={`${styles.NotFound} justify-content-center mt-2`}
        src={NoResults}
        fluid
        message={`Sorry, the page you're looking for doesn't exist`}
      />
      <Link to="/">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue} text-center mb-2`}
        >
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
