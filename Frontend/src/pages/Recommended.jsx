import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_API_KEY;

const Recommended = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    fetch(url)
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {movies.slice(0, 16).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Recommended;
