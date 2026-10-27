
const STORAGE_KEY = "celebrare-favorites";

export function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const id = String(action.id);

      const isFavorite = state.includes(id);

      if (isFavorite) {
        return state.filter((favoriteId) => favoriteId !== id);
      }

      return [...state, id];
    }

    default:
      return state;
  }
}
