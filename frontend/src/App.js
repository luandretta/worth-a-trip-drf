import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import PostDelete from "./pages/posts/PostDelete";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import ErrorModal from "./components/ErrorModal";
import { createContext, useState } from "react";
import ContactCreateForm from "./pages/contact/ContactCreateForm";
// Notifications
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const ErrorContext = createContext();

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleError = () => {
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <ErrorContext.Provider value={handleError}>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          {/* Rendering the NotificationContainer component */}
          <NotificationContainer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />
            <Route
              exact
              path="/whished"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or wish a travel."
                  filter={`wishes__owner__profile=${profile_id}&ordering=-wishes__created_at&`}
                />
              )}
            />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => <PostEditForm />}
            />
            <Route
              exact
              path="/posts/:id/delete"
              render={() => <PostDelete />}
            />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            <Route exact path="/contact" render={() => <ContactCreateForm />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
        <ErrorModal show={showErrorModal} onClose={closeErrorModal} />
      </div>
    </ErrorContext.Provider>
  );
}

export default App;
