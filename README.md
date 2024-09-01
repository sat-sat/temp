# Peach Frontend Challenge

### Running the Project

1. `npm install`
2. `npm run dev`

Click the link in the console to open the webpage.

## Notes

### Overview

- Full Tech Stack
  - TypeScript, React, Vite, React Query, Zustand, Mantine UI, React Router
  - I created a public web app template to get started on this at github.com/jasonpang/web-app-template

### Technical Choices

- Tech Stack:
  - React Query & Zustand
    - I used React Query's network store separately from Zustand's client store. Data and network status for API calls are stored in React Query. Other non-network client state is stored in Zustand (this turned out just to be favorite movie IDs).
- Styling variables

  - Tried to keep Peach styles as CSS variables

  ```
  :root {
  --search-page-margin-top: 20vh;
  --movie-card-width: 200px;
  --color-grey-400: #a3a3a5;
  --color-grey-800: #3e3e40;
  --color-grey-700: #565659;
  --color-grey-900: #252528;
  }
  ```

### Design Choices

- The Figma design shows the landing search page has a 200px-ish top margin and the search results and favorites page share this margin. I thought this is a lot of space but I kept it as `margin-top: 20vh`.

### With more time...

- Testing
  - I'd add React Testing Library tests and maybe some Playwright end to end tests
- Refactoring
  - Some UI components have a lot of lines of code. I'd like to split them up further to be more bite-sized
- Hook Naming
  - Some hook names are confusing (useFavoriteMovie vs. useFavoriteMovies vs. useGetFavoriteMovies). I'd rethink/rename these if I had more time.
