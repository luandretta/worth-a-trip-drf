# Worth a Trip

![Welcome to Worth a Trip](documentation/images/home.png)


Worth a trip is  a free social networking plattform designed for travel lovers. Users can share  by sharing photo, location, trip type and tips. 
The project's primary objective is to deliver a highly functional and responsive website that empowers users to create and share their posts about lovely places worth a trip effortlessly. Through its comprehensive CRUD functionality, users can easily modify and delete their posts and comments as needed. 

The application is a full-stack project, created using JavaScript, CSS & HTML and built on the React front-end framework using the back-end REST API.

This project was based on the walkthrough project in the Advanced Front End section of the Full Stack Software Development.

Link to deployed site:

- [Worth a Trip - Live](https://worth-a-trip-drf-40e2fa952827.herokuapp.com/)



![GitHub last commit](https://img.shields.io/github/last-commit/luandretta/worth-a-trip-drf?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/luandretta/worth-a-trip-drf?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/luandretta/worth-a-trip-drf?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/luandretta/worth-a-trip-drf?style=for-the-badge)

# Unifying DRF Api and React parts into a unified workspace and deployment

Initially the project had two repositories, for the back-end and the front-end. As recommended by Code Institute, the project was unified and deployed.

Implementing the steps provided should address many of the issues highlighted by previous students, and make debugging the project significantly easier and allowing to work on the project from a single workspace.

Below is a link to the initial front-end repository to check issues and commits 

[Front-end part before unification](https://github.com/luandretta/worth-a-trip-frontend)

This repository will be maintained for assessments of this latest project for the Code Institute.

# User Experience

## Project Goals 

The goal of this project was to build a full featured image sharing service as a social media platform. It has been designed for its users to share their trips and discover exciting places worth a trip.


## Agile

The Agile Tool was used to help to organize and prioritize the tasks using Project Boards on GitHub.

In the first instance a spreadsheet was created to help gather details by theme to later define the epics. Themes: Account Management, Profile, Post Pool, Navigation and Admin.

The issues were created for each User Story, which was then allocated to a milestone (Epic) in Github before the repositories (front-end and back-end) were unified.

![](documentation/images/issues.png)

[Issues in frontend repo](https://github.com/luandretta/worth-a-trip-frontend/issues?page=1&q=is%3Aissue+is%3Aopen)

A Template for issues was created to speed up the process of adding User Stories to this project. 

* In the repositorie, head over to the settings, then Set Up Templates on the Features. The Issue Template helps to add enough information to the card, so the Developer knoks what are the MVP Points to address.


The MoSCow priorization and customized labels to user stories were used to priorize and implement the features.


* Must Have: guaranteed to be delivered (max 60% of stories)
* Should Have: adds significant value, but not vital ( ~20% of stories)
* Could Have: has small impact if left out (the rest ~20% of stories)
* Won't Have: not a priority for this iteration

The allocation the User Stories to Milestones helps in planning the Sprints. 3 Milestones were created: Minimum Viable Product (MVP) realease, CRUD and Add Authentication and Account functionality.

The Kanban Board, as an agile project management tool, helped to visualize the tasks and limit the work in progress (WIP) by moving cards between the Todo, Backend - DRF, Frontend - React, Test and Done columns.

The Table View was used to sorted the issus according to labels, milestones or status.

## User Stories

### Persona

The target audience for Worth a trip is:
* travel lovers;
* would like to share informations or their thoughts on social media;
* would like to influence people;
* wants to gain hints about trips;
* would like to discover new places to visit.



| Category  | as| I want to | so that I can | UI components  | MoSCow |
| --------- | ------- | -------------- | ---------------------------------- | ------------------ | --------- |
| auth | user| register for an account | have a personal profile with a picture| SignUpForm<br>ProfilePage<br>ProfileEditForm | Must Have |
| auth | user | register for an account  | create, like, bookmarkt and comment on posts | Post<br>PostPage<br>Comment | Must Have |
| auth | user | register for an account | follow anothers users | Profile<br>ProfilePage| Should Have |
| posts | visitor | view a list of posts | browse the most recent uploads | PostsPage  | Must Have |
| posts | visitor | view an individual post | see user feedback, i.e. likes and read comments  | Post<br>PostPage | Should Have |
| posts | visitor | search a list of posts | find a post by title or city or triptype| PostsPage | Should Have |
| posts | visitor | scroll through a list of posts | browse the site more comfortably | InfiniteScrollComponent | Could Have |
| posts | user | create a post  | share my trips with others | PostCreateForm | Must Have |
| posts | user| edit and delete my post | correct or hide any mistakes  | PostEditForm<br>MoreDropdownMenu | Must Have |
| posts | user | view liked and bookmarket posts  | go back often to my favourite and desired posts | PostsPage | Should Have |
| posts | user| view followed users' posts | keep up with my favourite users' trips  | PostsPage  | Should Have |
| posts | user| view saved users' posts | go back often to find inpirations for the next trip  | PostsPage  | Must Have |
| likes | user | like a post  | express my interest in someone's shared trip  | Post like icon   | Must Have |
| likes | user| unlike a post | express that my interest in someone's shared trip has faded away | Post (un) like icon | Must Have |
| wishes | user | save a post  | express my interest in someone's shared trip  | Post pin icon   | Could Have |
| wishes | user| unsave a post | express that my interest in someone's shared trip has faded away | Post (un) pin icon | Could Have |
| comments | user | create a comment  | share my thoughts on other people's content | PostPage<br>CommentCreateForm | Should Have |
| comments | user | edit and delete my comment  | correct or hide any mistakes | PostPage<br>Comment<br>MoreDropdownMenu | Should Have |
| profiles | user | view a profile  | see a user's recent posts, followers, following count data | ProfilePage<br>Post  | Must Have |
| profiles | user | edit a profile | update my profile information | ProfileEditForm  | Must Have |
| followers | user | follow a profile | express my interest in someone's content  | Profile follow button | Could Have |
| followers | user | unfollow a profile | express that my interest in someone's content has faded away and remove their posts from my feed | Profile (un) follow button |  Could Have |
| contact | user | get in touch with the website creator | clear up my doubts | Contact | Must Have |

The User Stories with the MoSCow priorization as "Won't Have" will be listed in the futures implementations.

# Design 

The website was designed with a minimalistic style to align with the site's objectives. The simple design allows users to easily navigate through the site and find what they are looking for.

## Colour Scheme

The design is quite simple.
A light colour scheme is used to ensure that there is a good contrast with the text and to create a clean and visually appealing look across the site. 
The scheme establishes a strong contrast between the background colors and text and, at the same time, ensures that the site meets accessibility requirements. 
Differents shades of gray are used to give more contrast between background and foreground.
The blau and green colors are present in the buttons and icons.
The red color is used to gain attention when user want to delete his post.

| Color         |Hex    |
| ---------- | ------ |
| Blue | ![#1B4066](https://via.placeholder.com/40/1B4066?text=+) #1B4066 |
| Green | ![#116c69](https://via.placeholder.com/40/116c69?text=+) #116c69|
| Red | ![#FF0000](https://via.placeholder.com/40/FF0000?text=+) #FF0000 |
| White | ![#ffffff](https://via.placeholder.com/40/ffffff?text=+) #ffffff |
| Dark gray | ![#555555](https://via.placeholder.com/40/555555?text=+) #555555 |
| Gray | ![#888](https://via.placeholder.com/40/888?text=+) #888 |
| Light gray | ![#dadadf](https://via.placeholder.com/40/dadadf?text=+) #dadadf |

## Typography

The [Poppins](https://fonts.google.com/specimen/Poppins) was used for the Logo Worth a Trip and header elements. Poppins is one of the Geometric sans serif typefaces have been a popular design tool for building websites. Each letterform is nearly monolinear, with optical corrections applied to stroke joints where necessary to maintain an even typographic color.

The  [Roboto](https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap) was used for the body text on the site. Roboto is a sans-serif font which allows it to be legible and is a great choice for accessibility.

[Font Awesome](https://fontawesome.com/icons/) icons were used throughout the site.

## Imagery

* Pictures were dowloaded from [Pexels](https://www.pexels.com/) and edited at [Canva](https://www.canva.com/)

## Wireframes

Wireframes were created for mobile, tablet and desktop using [Balsamiq](https://balsamiq.com/).


| Page | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Home not logged in | ![Home Page](documentation/) | ![Home Page](documentation/)| ![Home Page](documentation/) |
| Home logged in | ![Home Page](documentation/) | ![Home Page](documentation/)| ![Home Page](documentation/) |
| Sign in, Sing up Pages | ![Sign in, Sing up Pages ](documentation/) | ![Sign in, Sing up Pages ](documentation/)| ![Sign in, Sing up Pages ](documentation/) |


# Features

## Pages

## Future implementations

## Accessibility

## Detailed page and component breakdown:



## Detailed page and component breakdown

![Lucichart](documentation/images/component-map.drawio.png)


## Components

A number of reusable React components were created with the intention of reducing code duplication.

### `Asset.js`

The `Asset.js` is a versatile and reusable component that is used to render the loading spinner utilised throughout the app. It accepts a small prop which a parent component can use to request a smaller spinner. With customizable props such as spinner, src, and message, the component can be easily adapted to suit different use cases and design requirements. 
To ensure the maximum accessibility for spinner components the Spinner component has the relevant ARIA role property, and include screenreader-only readable text representation of the spinner's meaning inside the component using Bootstrap's visually-hidden class.

### `Avatar.js`

The `Avatar.js`component is designed to display user avatars with a high degree of flexibility and reusability. Separating the avatar display from other components and pages enables more efficient code organization and easier maintenance. With customizable height and an optional text overlay, the Avatar component can adapt to different page designs and layouts, allowing for seamless integration into different parts of the site. 


### `MoreDropdown.js` 

The `MoreDropdown.js` component  provides a dropdown menu represented by the three dots (`...`), visible on any content, where a user respectively the owner of an object, can edit it. It contains two main actions: "Edit" and "Delete". When clicked, each respective action is taken.

- ThreeDots: This is a custom toggle for the dropdown menu. The use of `React.forwardRef` ensures that the dropdown gets access to the DOM for positioning.

- Dropdown Toggle: It uses the ThreeDots component as the toggle button for the dropdown.

- Dropdown Menu: This contains two items:

  - Edit: Represented by a pencil icon, when clicked, it triggers the `handleEdit` function.
  - Delete: Represented by a trash can icon, when clicked, it trigggers the `handleDelete` function.

**Profile Edit Dropdown**

The `ProfileEditDropdown` is a similar dropdown like the MoreDropdown but specifically for the profile actions. Instead of general actions like the MoreDropdown, it contains three actions that relate are used in the profile section: "Edit Profile", "Change Username", and "Change Password".

- Dropdown Menu: This contains three items:
 - Edit Profile: Navigates the user to the profile edit page.
 - Change Username: Navigates the user to the username change page.
 - Change Password: Navigates the user to the password change page.

The component uses the `useHistory` hook to handle navigation for each dropdown action.

The styling is handled by the MoreDropdown.module.css file.

### React Infinite Scroll 

Introduced to replace traditional pagination with lazy loading instead of pagination to make the application more performant and seem more snappy/ engaging.
This feature works by loading new content into the webpage when the user reaches the bottom of the page, without requiring the user to manually click a *Load More* button.  This feature provides a seamless user experience, as the user can easily browse through a large amount of content without interruptions or delays.

### `Post.js` 

The Post component receives several props that contain information about a post. The component also uses the useCurrentUser hook from a custom context called CurrentUserContext to retrieve the current user. The Post component renders information about the post including its owner, title, image, ratings and the number of comments, likes, and wishes. It also renders the `Avatar.js` component and the `PostDropdownBar.js` component which is only displayed if the current user is the owner of the post and is viewing it on the post detail page. The Post component contains several functions that handle different events like deleting a post, editing a post, liking a post, unliking a post, pin a post, and remove the pin. These functions make API calls using axiosRes. When the user likes or unlikes a post or pin or remove the pin from the post, the Post component updates the posts state by calling the setPosts function passed down as a prop to the component. It updates the  properties of the post object in the posts state. This component is used to display posts on the *'Feed'*, *'Desired'* and *'Liked'* pages. The handle edit and delete redirect to their pages.

### `PostDelete.js`

The Post Delete component was created so that the owner doesn't delete a post object unintentionally. The user needs to click on the button to confirm deletion or cancel and go back using `useHistory`hook to handle navigation history.

### `NotFound.js`

The NotFound component is used to inform users that the page they're trying to access doesn't exist or cannot be found. This component provides a user-friendly response to potential navigation errors or mistyped URLs. It reuses the `Asset` component to display a messsage and an image.

### `ErrorModal.js`

The ErrorModal component serves as a notification system for displaying error messages to the user using the try, cach blocks.

## Most reused components

- PostsPage:
  - Home, Feed, Liked, Wished
- Post:
  - PostsPage
- Profile:
  - PopularProfiles, PopularProfiles (mobile)
- DropdownMenus:
  - Post, ProfilePage, Comment
- InfiniteScrollComponent:
  - PostPage (loading Comment components)
  - PostsPage (loading all, feed, liked or wished Post components)
  - ProfilePage (loading Post components that belong to the profile)


## Contexts

### CurrentUserContext 

The CurrentUserContext exposes the user state to the entire app. Relevant components can subscribe to its changes.

### ProfileDataContext

ProfileDataContext exposes the profile state to the entire app. Enables the PopularProfiles component to be in sync with the ProfilePage contents

## Hooks

Custom hooks written to reduce repeatable state logic.

### `useClickOutsideToggle`

The custom hook useClickOutsideToggle enables togglng on the burger menu in the `NavigationBar.js`. When the user clicks on the menu, it toggles the expanded state using the setExpanded function. The expanded value is then used to conditionally render the menu items. When the user clicks outside of the menu, the `useOutsideClickToggle` hook automatically updates the expanded state to false, hiding the menu.

### `useRedirect`

The useRedirect hook enables redirect for users who are either logged in or logged out, depending on the use case. It uses  the React Router and Axios libraries to handle navigation and API requests.



## Database Schema & User Journey

#### User Journey

![User Journey](documentation/images/user-journey.png)

#### Database Schema

* **Diagram**

An entity relationship diagram was created to help the visualization the relationships of the data structures and mapped it out.

![Entity Diagram](documentation/images/entity-relationship-diagram.png)


* **Models**

Models created for this application:

- Profile

- Posts

The model will give the users the ability to store posts in the database and the serializer will convert and validate the model instances. It'll also add fields that are not stored in the database.

- Wishes

## API Endpoints

## Frameworks, libraries and dependencies

- Django Rest Framework

A powerful and flexible toolkit for building Web APIs, that offers Authentication policies including packages for OAuth1a and OAuth2 and serialization that supports both ORM and non-ORM data sources.

- Signals

Signals allow certain senders to notify a set of receivers that some action has taken place. They’re especially useful when many pieces of code may be interested in the same events.

- Serializers

Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types

- Coverage

Coverage.py is a tool for measuring code coverage of Python programs. It monitors your program, noting which parts of the code have been executed, then analyzes the source to identify code that could have been executed but was not. Coverage measurement is typically used to gauge the effectiveness of tests. It can show which parts of your code are being exercised by tests, and which are not.

- React Bootstrap 

The most popular front-end framework, as one of the oldest React libraries, React-Bootstrap has evolved and grown alongside React, making it an excellent choice as the UI foundation. Each component is implemented with accessibility in mind. The result is a set of accessible-by-default components.

- React Router 

To control what the user sees depending on the URL they have accessed in the browser.

- Axios

To tell the React project to send requests to the API 

- Mock Service Worker

To create mock endpoints needed to test NavBar component

- Dayjs

To format dates in React

- Django-countries 7.5.1

Provides country choices for use with forms, flag icons static files, and a country field for models.

- React Simple Rating

A simple react component for adding a star rating


- Select

## Deployment steps
- add prebuild script
- add Procfile
- remove all console.logs
- use Bootstrap default imports to minimize the build
- deploy to Heroku

## Credits

### Source

- [Django Rest Framework](https://www.django-rest-framework.org/api-guide/serializers)
- [React Bootstrap](https://react-bootstrap.netlify.app/docs/components/navbar/#text-and-non-nav-links)
- [How to reset Django Database](https://stackoverflow.com/questions/66733285/how-to-reset-django-database)
- [Ultimate Guide: How to Format Date in React](https://reacthustle.com/blog/react-format-date-ultimate-guide)
- [Testing Library - React Router](https://testing-library.com/docs/example-react-router/)
- [Appearance and Disappearance - Asserting elements are not present](https://testing-library.com/docs/guide-disappearance/)
- [Django-countries](https://pypi.org/project/django-countries/#single-field-customization)
- [How to show API data on React-Select](https://stackoverflow.com/questions/74238883/how-to-show-api-data-on-react-select)
- [React Select](https://coderszine.com/react-select-dropdown-list-from-api/)
- [Submit Form Data To REST API In A React App](https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/)
- [Django-countries Rest output format](https://github.com/SmileyChris/django-countries/#rest-output-format)
- [Django humanize](https://docs.djangoproject.com/en/4.2/ref/contrib/humanize/)
- [Django humanize outside of template](https://stackoverflow.com/questions/17226779/django-humanize-outside-of-template)
- [Django Models](https://www.geeksforgeeks.org/emailfield-django-models/)
- [MDB](https://mdbootstrap.com/docs/react/utilities/spacing/)
- [React Native Email Validation](https://www.abstractapi.com/guides/react-native-email-validation)
- [npm ERR! Conflicting peer dependency](https://stackoverflow.com/questions/72976149/npm-err-conflicting-peer-dependency-react18-0-0)
- [React Best Practices](https://www.freecodecamp.org/news/best-practices-for-react/)
- [How to add infinite scroll to a React js and Django Rest Framework project](https://www.youtube.com/watch?v=bFKBu917kw8)
- [Spinners](https://react-bootstrap.netlify.app/docs/components/spinners/)
- [Coverage.py](https://coverage.readthedocs.io/en/7.2.7/)
- [Star Rating](https://www.npmjs.com/package/react-simple-star-rating)



![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)
