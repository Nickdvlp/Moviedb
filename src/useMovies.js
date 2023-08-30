import { useState, useEffect } from "react";

const KEY = "18e76194";
export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    // callback?.();

    async function FetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error(
            "something went wrong with fetching movies. Please check your connection"
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("movie not found");
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie();
    FetchMovies();

    // return function () {
    //   controller.abort();
    // };
  }, [query]);

  return { movies, isLoading, error };
};
