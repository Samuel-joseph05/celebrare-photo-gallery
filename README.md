# Celebrare Photo Gallery

A responsive photo gallery web application built with React, Vite, and Tailwind CSS as part of the Celebrare Frontend React Internship Pre-Screening Assignment.

## Features

- **Fetch Photos:** Fetches 30 photos from the Picsum Photos API.
- **Loading State:** Displays a loading spinner while photos are being fetched.
- **Error Handling:** Displays an error message if the API request fails.
- **Responsive Grid:** Displays photos in a responsive layout with 1 column on mobile, 2 columns on tablets, and 4 columns on desktop.
- **Author Search:** Filters photos by author name in real time without making additional API requests.
- **Favourites:** Add or remove photos from favourites using a heart button.
- **Persistent Favourites:** Saves favourite photo IDs in browser localStorage so they remain available after refreshing the page.
- **Custom Hook:** Uses `useFetchPhotos` to separate API-fetching logic from the UI.
- **Reducer State Management:** Uses React's `useReducer` hook to manage favourites.
- **Performance Hooks:** Uses `useCallback` for the search handler and `useMemo` to compute the filtered photo list.

## Technologies Used

- React
- Vite
- JavaScript
- Tailwind CSS
- Picsum Photos API
- React Hooks: `useState`, `useEffect`, `useReducer`, `useCallback`, and `useMemo`
- Browser localStorage

## API

Photos are fetched from:

https://picsum.photos/v2/list?limit=30

The API provides photo information, including the photo ID, author name, and image URL.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Samuel-joseph05/celebrare-photo-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd celebrare-photo-gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## Project Structure

```text
celebrare-photo-gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx
│   │   └── PhotoCard.jsx
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favoritesReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Implementation Details

### Custom Hook: `useFetchPhotos`

Fetches photos from the Picsum Photos API and returns three values:

- `photos`: The fetched photo data.
- `loading`: Indicates whether the request is in progress.
- `error`: Contains the error message if the request fails.

### Favourites with `useReducer`

The favourites reducer handles the `TOGGLE_FAVORITE` action. It adds a photo ID to the favourites list or removes it if it is already favourited.

Favourite IDs are saved in localStorage and restored when the application loads.

### Search with `useCallback` and `useMemo`

The search handler uses `useCallback`, while `useMemo` computes the filtered photo list based on the loaded photos and the current search term.

Search filtering is performed locally without additional API requests.

## Assignment Requirements

This project implements the seven requirements specified in the Celebrare Frontend React Internship Pre-Screening Assignment.

## Author

**SAMUEL**

GitHub: https://github.com/Samuel-joseph05


