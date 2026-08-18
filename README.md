# RCM Admin Portal

A simple React-based admin portal assignment built with React, TypeScript, Tailwind CSS, and React Router.

The application provides a protected admin area where authenticated users can search GitHub users, view their profile information, and browse, filter, and sort their public repositories.

## Features

### Authentication

* Hardcoded admin credentials for assignment purposes
* Authentication state managed using React Context
* Authentication persisted using browser `localStorage`
* Protected `/dashboard` and `/users` routes
* Unauthenticated users are redirected to `/login`
* Authenticated users visiting `/login` are redirected to `/dashboard`
* Root `/` route redirects based on authentication state
* Logout functionality clears the authentication state and local storage

### GitHub User Search

* Search GitHub users by username
* Debounced search with approximately 500ms delay
* Uses the public GitHub REST API
* Displays GitHub user information:

  * Avatar
  * Name
  * Username
  * Bio
  * Follower count
* Displays the user's public repositories

### Repository Management

* Repository name
* Repository description
* Star count
* Primary programming language
* Link to the GitHub repository
* Client-side repository filtering
* Sort repositories by:

  * Stars
  * Name

### UI and UX

* Responsive layout
* Sidebar navigation
* Loading state during API requests
* Error state for invalid users or failed requests
* Empty state when no repositories match the filter
* Active navigation state
* Basic form validation

---

## Technology Stack

| Technology           | Purpose                         |
| -------------------- | ------------------------------- |
| React                | User interface                  |
| TypeScript           | Static typing                   |
| Tailwind CSS         | Styling and responsive UI       |
| React Router         | Routing and protected routes    |
| React Context API    | Authentication state            |
| Browser localStorage | Authentication persistence      |
| GitHub REST API      | GitHub user and repository data |
| Vite                 | Development and build tooling   |

---

## Project Structure

```text
rcm-admin-portal/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── constants/
│   │   └── routes.ts
│   │
│   ├── layout/
│   │   └── Layout.tsx
│   │
│   ├── pages/
│   │   │
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   │
│   │   ├── login/
│   │   │   ├── Login.tsx
│   │   │   ├── AuthContext.tsx
│   │   │   ├── auth.types.ts
│   │   │   └── auth.storage.ts
│   │   │
│   │   ├── users/
│   │   │   ├── Users.tsx
│   │   │   ├── users.api.ts
│   │   │   └── users.types.ts
│   │   │
│   │   └── page-not-found/
│   │       └── PageNotFound.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The project follows a simple feature-oriented structure. Authentication-specific files are kept inside the login page directory, while GitHub API-related files are kept inside the users feature.

Additional folders or abstractions are intentionally avoided where they are not required by the project.

---

## Application Routes

| Route        | Access    | Description                                                       |
| ------------ | --------- | ----------------------------------------------------------------- |
| `/`          | Public    | Redirects to `/login` or `/dashboard` depending on authentication |
| `/login`     | Public    | Login page                                                        |
| `/dashboard` | Protected | Admin dashboard                                                   |
| `/users`     | Protected | GitHub user search and repository view                            |
| `*`          | Public    | Page not found                                                    |

### Protected Route Flow

```text
User requests /dashboard or /users
                |
                v
        ProtectedRoute
                |
        Is user authenticated?
           /           \
         No             Yes
         |               |
         v               v
      /login           Page
```

---

## Authentication

This assignment uses hardcoded credentials because no backend authentication service is required.

### Demo Credentials

```text
Email: admin@rcm.com
Password: 123456
```

After successful authentication, the user information is:

1. Stored in React Context.
2. Stored in `localStorage` using the `rcm_auth` key.
3. Used by protected routes to determine access.
4. Restored from `localStorage` when the application is refreshed.

### Authentication Flow

```text
Login Form
    |
    v
AuthContext.login()
    |
    v
Validate hardcoded credentials
    |
    +---- Invalid ----> Error message
    |
    +---- Valid
             |
             v
        Update Context
             |
             v
        Save to localStorage
             |
             v
        Navigate to Dashboard
```

### Logout Flow

```text
Logout
  |
  v
AuthContext.logout()
  |
  +---- Clear Context state
  |
  +---- Remove rcm_auth
  |
  v
Navigate to /login
```

---

## GitHub API Integration

The application uses the public GitHub REST API.

### User Endpoint

```text
GET https://api.github.com/users/{username}
```

Used to retrieve:

* Username
* Avatar
* Name
* Bio
* Followers

### Repository Endpoint

```text
GET https://api.github.com/users/{username}/repos
```

The application requests up to 100 repositories per request for client-side filtering and sorting.

Used repository fields:

* Repository ID
* Repository name
* Description
* Star count
* Primary language
* Repository URL

---

## Search and Debouncing

The GitHub username search uses a 500ms debounce.

Instead of making an API request for every keystroke:

```text
o
oc
oct
octo
octoc
octoca
octocat
```

the application waits until the user stops typing.

```text
User types
    |
    v
500ms timer
    |
    +---- User continues typing
    |          |
    |          v
    |      Reset timer
    |
    +---- User stops typing
               |
               v
          API request
```

This reduces unnecessary API requests and improves the user experience.

---

## Repository Filtering and Sorting

Repository filtering is performed entirely on the client.

Once repositories are loaded from GitHub, users can filter them by repository name without making another API request.

```text
Loaded repositories
        |
        v
Repository filter
        |
        v
Filtered repositories
```

Repositories can also be sorted by:

* Stars
* Name

The filtered and sorted list is derived using React's `useMemo`.

---

## State Management

The project intentionally uses React hooks rather than a state management library.

### Authentication

React Context is used for application-level authentication state.

```text
AuthProvider
    |
    +-- user
    +-- isAuthenticated
    +-- login()
    +-- logout()
```

### Users Feature

The Users page manages its own feature-specific state using React hooks:

```text
useState
useEffect
useMemo
```

State includes:

* GitHub username
* GitHub user data
* Repository list
* Repository filter
* Sort option
* Loading state
* Error state

Redux or another external state management library is not required for this application.

---

## Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm

### Clone the Project

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd rcm-admin-portal
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Runs the production build locally for preview.

### Lint

```bash
npm run lint
```

Runs the configured ESLint checks.

---

## Application Flow

The overall application flow is:

```text
                    RCM Admin Portal
                           |
                    Authentication
                           |
                +----------+----------+
                |                     |
             Logged Out           Logged In
                |                     |
                v                     v
              Login              Dashboard
                                      |
                              +-------+-------+
                              |               |
                           Dashboard         Users
                                              |
                                              v
                                      GitHub Username
                                              |
                                              v
                                       Debounced Search
                                              |
                                              v
                                       GitHub REST API
                                              |
                              +---------------+---------------+
                              |                               |
                         User Profile                    Repositories
                                                              |
                                                    +---------+---------+
                                                    |                   |
                                                Filter                Sort
```

---

## Important Note About Authentication

This project uses frontend-only authentication because it is an assignment project.

The hardcoded credentials and `localStorage` implementation should not be considered production-grade authentication.

In a real application, authentication should be handled by a backend service with appropriate session or token management. Backend APIs should independently validate authentication and authorization rather than relying on frontend route protection.

The React `ProtectedRoute` prevents unauthenticated users from accessing the application's protected UI, but it does not provide security for external APIs by itself.

---

## Design Decisions

### Simple Project Structure

The project intentionally avoids unnecessary abstractions and folders.

For example, separate top-level folders for:

```text
services/
hooks/
utils/
models/
repositories/
```

are not required for this assignment.

Feature-specific code is kept close to the page that uses it.

### Native Fetch API

The project uses the browser's built-in `fetch` API instead of adding Axios because the API requirements are simple and do not require a separate HTTP client.

### React Hooks

The project uses React hooks for local and application state:

```text
useState
useEffect
useMemo
useContext
```

No Redux or external state management library is required.

### Reusable Components

Only components that are genuinely shared across the application are placed inside `components/`.

Examples:

```text
Sidebar
ProtectedRoute
```

Page-specific UI remains inside its respective page.

---

## Future Improvements

If this application were extended beyond the assignment requirements, possible improvements could include:

* Backend-based authentication
* API request cancellation using `AbortController`
* GitHub API pagination
* GitHub API rate-limit handling
* Search history
* Repository pagination
* More detailed repository information
* Mobile sidebar navigation
* Skeleton loading states
* Unit and integration tests
* Centralized API error handling
* Environment-based configuration
* Proper authentication and authorization
* Automated deployment

These improvements are intentionally outside the current assignment scope.

---

## Assignment Requirements Coverage

| Requirement                      | Implementation |
| -------------------------------- | -------------- |
| React                            | Implemented    |
| TypeScript                       | Implemented    |
| Tailwind CSS                     | Implemented    |
| Protected `/dashboard`           | Implemented    |
| Protected `/users`               | Implemented    |
| Hardcoded login                  | Implemented    |
| Authentication Context           | Implemented    |
| localStorage persistence         | Implemented    |
| GitHub user search               | Implemented    |
| 500ms debounce                   | Implemented    |
| GitHub user API                  | Implemented    |
| GitHub repositories API          | Implemented    |
| Loading state                    | Implemented    |
| Error state                      | Implemented    |
| User avatar                      | Implemented    |
| User name                        | Implemented    |
| User bio                         | Implemented    |
| Follower count                   | Implemented    |
| Repository name                  | Implemented    |
| Repository description           | Implemented    |
| Repository stars                 | Implemented    |
| Repository language              | Implemented    |
| Sort by stars                    | Implemented    |
| Sort by name                     | Implemented    |
| Client-side repository filtering | Implemented    |
| React hooks for state management | Implemented    |
| Redux                            | Not required   |

---

## License

This project was created as an assignment project for learning and demonstration purposes.
