import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_API_KEY;

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.results || []).map((show) => ({
          ...show,
          title: show.name,
          release_date: show.first_air_date,
          type: "TV Show",
        }));
        setTvShows(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ml-32 min-h-screen text-white p-8">
      <SearchBar placeholder="Search for TV shows" />

      <div className="mb-10">
        <h1 className="text-2xl tracking-wide">TV Shows</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {tvShows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
};

export default TVShows;
