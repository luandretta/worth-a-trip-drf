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
  const profileLink = screen.getByRole("link", { name: "avatar Profile" });
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
  expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Add post" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Liked" })
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Feed" })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Bookmarks" })
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

  expect(screen.getByRole("link", { name: "Add post" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Feed" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Liked" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Bookmarks" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "avatar Profile" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign out" })).toBeInTheDocument();
  expect(screen.queryByText("Sign in")).toBeNull();
  expect(screen.queryByText("Sign up")).toBeNull();
});
