import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const apiKey = import.meta.env.VITE_API_KEY;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`
        );
        const data = await res.json();

        const formatted = (data.results || [])
          .filter((item) => item.media_type === "movie" || item.media_type === "tv")
          .map((item) => ({
            ...item,
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
            type: item.media_type === "tv" ? "TV Show" : "Movie",
          }));

        setMovies(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="ml-32 min-h-screen text-white p-8">
      <SearchBar placeholder="Search for movies or TV shows" />

      {movies.length === 0 ? (
        <div className="text-gray-400 text-xl">No movies found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
