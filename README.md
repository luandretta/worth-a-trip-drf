# Worth a Trip

![Welcome to Worth a Trip](documentation/images/home.png)


Worth a trip is  a free social networking plattform designed for travel lovers. Users can share lovely places worth a trip by sharing photo, location, trip type and tips. They can interact each other leaving comments under the post.

The application consists of the React app and an API. This project was based on the walkthrough project in the Advanced Front End section of the Full Stack Software Development.

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

### Issues

[Issues in frontend repo](https://github.com/luandretta/worth-a-trip-frontend/issues?page=1&q=is%3Aissue+is%3Aopen)

## Agile

The Agile Tool was used to help to organize and prioritize the tasks using Project Boards on GitHub.

In the first instance a spreadsheet was created to help gather details by theme to later define the epics. Themes: Account Management, Profile, Post Pool, Navigation and Admin.

A Template for issues was created to speed up the process of adding User Stories to this project. 

* In the repositorie, head over to the settings, then Set Up Templates on the Features. The Issue Template helps to add enough information to the card, so the Developer knoks what are the MVP Points to address.


The MoSCow priorization and customized labels to user stories were used to priorize and implement the features.


* Must Have: guaranteed to be delivered (max 60% of stories)
* Should Have: adds significant value, but not vital (the rest ~20% of stories)
* Could Have: has small impact if left out (20% of stories)
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
| auth | user | register for an account  | create, like and comment on posts | Post<br>PostPage<br>Comment | Must Have |
| auth | user    | register for an account | follow users | Profile<br>ProfilePage| Must Have |

# Design 

## Colour Scheme

## Typography

## Imagery

## Wireframes

# Features

## Pages

## Future implementations

## Accessibility

## Detailed page and component breakdown:

**Components map**

## Most reused components



## Data Models

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
- [MDB](https://mdbootstrap.com/docs/react/utilities/spacing/)
- [React Native Email Validation](https://www.abstractapi.com/guides/react-native-email-validation)



![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)
