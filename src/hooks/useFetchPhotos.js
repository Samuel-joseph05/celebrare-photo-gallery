
import { useEffect, useState } from "react";

const API_URL = "https://picsum.photos/v2/list?limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch photos.");
        }

        const data = await response.json();

        if (!ignore) {
          setPhotos(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, []);

  return { photos, loading, error };
}
