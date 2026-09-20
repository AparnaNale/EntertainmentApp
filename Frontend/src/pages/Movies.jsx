import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_API_KEY;

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.results || []).map((movie) => ({
          ...movie,
          type: "Movie",
        }));
        setMovies(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ml-32 min-h-screen text-white p-8">
      <SearchBar placeholder="Search for movies" />

      <div className="mb-10">
        <h1 className="text-2xl tracking-wide">Movies</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
