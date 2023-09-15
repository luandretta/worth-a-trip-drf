import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByAltText("avatar");
  expect(profileAvatar).toBeInTheDocument();
  const profileLink = screen.getByRole("link", { name: /admin/i });
  expect(profileLink.getAttribute("href")).toBe("/profiles/1");
});

test("renders Sign in and Sign up buttons again on log out, check links", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /SignIn/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /SignUp/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: /Add post/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: /Liked/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Feed/i })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: /Desired/i })
  ).not.toBeInTheDocument();
});

test("renders logged-in navigation items when user is authenticated", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  await screen.findByAltText("avatar");

  expect(screen.getByRole("link", { name: /Add post/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Feed/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Liked/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Wished/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /SignOut/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /SignIn/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /SignUp/i })).not.toBeInTheDocument();
});
