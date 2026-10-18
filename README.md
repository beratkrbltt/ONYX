# Onyx 🎮

A modern game discovery application built with **React, TypeScript, and Redux Toolkit**.

Onyx allows users to discover newly released and highly rated games, explore popular games across different categories, filter games by genre, search for specific titles, and view detailed information about individual games.

The application integrates the **RAWG Video Games Database API** to retrieve game data dynamically. It uses Redux Toolkit for centralized state management and React Router for navigation between the home page and game detail pages.

The project is deployed using **Firebase Hosting**.

---

## 🎥 Preview

![Onyx Preview](./preview.gif)

*Replace `preview.gif` with your actual project preview file.*

---

## 🌐 Live Demo

**Onyx:**  
[Live Demo](https://onyx-gamehub.web.app/)

---

## 🛠️ Technologies

- **React 19** — Component-based user interface development
- **TypeScript** — Static typing and improved code reliability
- **Vite** — Development server and build tooling
- **Redux Toolkit** — Centralized application state management
- **React Redux** — Connecting React components to the Redux store
- **RAWG API** — Dynamic video game data integration
- **Axios** — HTTP requests and API communication
- **React Router DOM** — Client-side routing
- **Material UI (MUI)** — UI components and styling support
- **Emotion** — CSS-in-JS styling
- **React Icons** — Icon library
- **Swiper** — Interactive sliders and carousels
- **CSS** — Custom styling and responsive layouts
- **Firebase Hosting** — Application deployment

---

## ✨ Features

### 🏗️ Component-Based Architecture

Onyx is structured as a React single-page application with reusable components and a clear separation of responsibilities.

The main application integrates the following components:

- **Navbar** — Provides navigation controls and the game search input.
- **Sidebar** — Allows users to select game genres and explore category-based results.
- **Home** — Displays featured games, popular categories, search results, and genre-filtered games.
- **GameDetail** — Presents detailed information about a selected game.
- **Loading** — Provides loading feedback while data is being retrieved.
- **Footer** — Provides the footer section.

The application-level component coordinates shared UI state and passes the required props to child components.

This approach helps keep the interface organized and makes individual components easier to maintain.

---

### 🎮 RAWG API Integration

Onyx retrieves game information dynamically from the RAWG Video Games Database API.

The application uses API data to display game titles, cover images, ratings, release dates, genres, and additional game information.

Axios is used for HTTP communication, while Redux Toolkit manages the application state associated with API requests.

The general data flow is:

1. A component or user interaction triggers a data request.
2. The application requests the relevant information from the RAWG API.
3. Redux processes the request and updates the application state.
4. React components access the updated state.
5. The interface renders the retrieved game data.

This approach separates data management from the presentation layer and supports consistent data handling across the application.

---

### ⭐ Featured Games and Popular Categories

The home page is designed to help users discover games without having to search for a specific title.

It includes:

- Newly released, highly rated games in the featured section.
- Popular games organized into different categories.
- Genre-based game listings.
- Dynamic game collections retrieved from the RAWG API.

These sections provide multiple ways to explore the game catalog and discover titles based on ratings, popularity, and genre.

---

### 🎯 Genre-Based Filtering

Users can select game genres from the sidebar to explore relevant titles.

When a genre is selected, the application updates the selected genre and retrieves the corresponding games for display on the home page.

The genre selection is managed through React state and shared with the relevant components through props.

Selecting a different genre updates the displayed collection, while changing the genre also clears the existing search input to keep the interface consistent.

---

### 🔍 Game Search

Onyx includes a search input in the navigation bar that allows users to search for games by name.

The search value is maintained in the application state and shared between the navigation bar and the home page.

As the search changes, the application retrieves matching games from the RAWG API and displays the corresponding results.

This provides a straightforward way to discover specific games within the catalog.

---

### 📄 Game Details

Users can navigate to a dedicated detail page for an individual game.

The application uses **React Router DOM** to handle routes such as:

`/games/:id`

The game detail page retrieves and displays additional information about the selected game, including:

- Game description
- Release date
- Rating and Metacritic score
- Genres
- Platforms
- Developers and publishers
- Official website, when available

The detail page provides a more comprehensive view of a game than the summary information displayed in the home page listings.

---

### 🔄 Redux Toolkit State Management

Redux Toolkit is used to manage API-related application state through Redux slices.

The state structure includes properties for:

- `loading` — Tracks loading status during data requests.
- `error` — Stores error information when a request fails.
- `games` — Stores game collections.
- `gamesCategory` — Stores available game categories.
- `featuredGames` — Stores featured game data.
- `GamesByCategory` — Organizes games by category.
- `searchResults` — Stores search results.
- `GameDetails` — Stores the selected game's detailed information.

The state is typed using TypeScript interfaces, helping maintain a predictable structure for game data and application state.

Centralized state management keeps API-related data organized and makes it accessible to the components that need it.

---

### ⚡ Asynchronous Data Handling

The application manages API requests and their results through Redux Toolkit slices.

The request lifecycle is reflected in the application state, allowing the UI to respond to loading and error conditions.

This makes it possible to provide loading feedback while data is being retrieved and handle unsuccessful requests without treating them as successful responses.

---

### 🛡️ TypeScript and Type Safety

TypeScript is used to define the structure of API data, application state, and component props.

The project includes dedicated types and interfaces such as:

- `GameType`
- `GameCategoryType`
- `GameDetailsType`
- `StateType`
- `HomeProps`
- `NavbarProps`
- `SidebarProps`

For example, the application defines nullable fields where API data may be unavailable:

```ts
interface GameType {
  id: number;
  slug: string;
  name: string;
  background_image: string | null;
  rating: number;
  released: string | null;
  metacritic: number | null;
}
```

Explicit types help identify potential data inconsistencies during development, improve code readability, and make component interfaces easier to understand.

TypeScript improves development-time type safety, although runtime validation and API key protection require separate measures.

---

### 🧭 Routing and Shared State

React Router DOM handles navigation between the home page and individual game detail pages.

The main `App` component coordinates shared interface state, including:

- Selected game genre
- Search input value
- Sidebar visibility

These values are passed to the relevant components through props.

This keeps shared UI interactions synchronized while allowing components to focus on their individual responsibilities.

---

## 📂 Project Structure

The following is a simplified representation of the application's component architecture:

```text
src/
├── components/
│   ├── Navbar/
│   ├── Home/
│   ├── GameDetail/
│   ├── Sidebar/
│   ├── Footer/
│   └── Loading/
│
├── redux/
│   ├── slices/
│   └── ...
│
├── types/
│   └── ...
│
├── App.tsx
├── App.css
└── main.tsx
```

*Note: This structure is illustrative. Adjust the directory names to match the actual repository.*

The project separates UI components, Redux state management, and TypeScript definitions to support code organization and maintainability.

---

## 🔄 Data Flow

The application's data flow can be summarized as follows:

```text
User Interaction
       ↓
React Components
       ↓
API Request
       ↓
RAWG API
       ↓
Redux Slice
       ↓
Redux Store
       ↓
Updated Application State
       ↓
React Components
       ↓
Rendered Game Data
```

The RAWG API provides the game data, Redux Toolkit manages application state, and React components render the results.

---

## 🚀 Deployment

Onyx is deployed using **Firebase Hosting**.

**Production URL:**  
[YOUR_FIREBASE_LIVE_URL](YOUR_FIREBASE_LIVE_URL)

---

## 💻 Installation

### Prerequisites

- Node.js
- npm
- A RAWG API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd onyx
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

If your implementation reads the RAWG API key from a Vite environment variable, create a `.env.local` file in the project root:

```env
VITE_RAWG_API_KEY=your_rawg_api_key
```

Use the API key and environment variable name expected by your actual API configuration.

**Security note:** Vite variables prefixed with `VITE_` are exposed to client-side code. They are useful for configuration, but they do not keep an API key secret. For stronger key protection, use a backend or server-side proxy. Never commit real credentials to your public repository.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite to access the application.

### 6. Build for production

```bash
npm run build
```

### 7. Preview the production build

```bash
npm run preview
```

---

## 📌 Project Goals

Onyx was developed as a practical project to explore modern frontend development concepts.

The main focus areas include:

- React component architecture
- TypeScript and type safety
- Redux Toolkit state management
- REST API integration with RAWG
- Asynchronous data handling
- Game search and genre-based filtering
- Dynamic data rendering
- Loading and error state management
- Client-side routing
- Reusable UI components
- Firebase deployment

---

## 👨‍💻 Developer

**Developer:** [BERAT KARABULUT]
---

*Onyx — Discover games, explore genres, and find your next favorite title.*
