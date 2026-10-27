
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";
import favoritesReducer, {
  getInitialFavorites,
} from "../reducers/favoritesReducer";
import PhotoCard from "./PhotoCard";

const STORAGE_KEY = "celebrare-favorites";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [searchTerm, setSearchTerm] = useState("");

  const [favoriteIds, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites
  );

  // Save favourites whenever the list changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favoriteIds)
      );
    } catch {
      console.error("Could not save favourites to localStorage.");
    }
  }, [favoriteIds]);

  // Handle search input changes.
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Filter the photos already loaded from the API.
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVORITE", id });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div
          role="status"
          aria-label="Loading photos"
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600"
        />
        <p className="text-slate-600">Loading photos...</p>
      </main>
    );
  }

 if (error) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-lg shadow-rose-100/50">
        {/* Error Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
          Oops! Something went wrong
        </h2>

        <p className="mb-6 text-sm leading-6 text-slate-500">
          We couldn't load your photos. Please check your connection and try
          again.
        </p>

        {/* Technical Error */}
        <p
          role="alert"
          className="mb-6 break-words rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.98]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Discover photography
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Photo Gallery
          </h1>

          <p className="mt-2 text-slate-500">
            Explore photos and save your favourites.
          </p>
        </header>

        <div className="mb-8">
          <label
            htmlFor="photo-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search by author
          </label>

          <input
            id="photo-search"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type an author name..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 sm:max-w-md"
          />
        </div>

        <p className="mb-5 text-sm text-slate-500">
          Showing {filteredPhotos.length} of {photos.length} photos
        </p>

        {filteredPhotos.length === 0 ? (
          <p className="rounded-lg bg-white p-8 text-center text-slate-600">
            No photos found for "{searchTerm}".
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => {
              const id = String(photo.id);

              return (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favoriteIds.includes(id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
