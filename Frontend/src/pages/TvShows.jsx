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
    <div className="lg:ml-32 min-h-screen text-white px-4 sm:px-6 lg:px-8 pt-28 lg:pt-8 pb-8">
      <SearchBar placeholder="Search for TV shows" />

      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl tracking-wide">TV Shows</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {tvShows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
};

export default TVShows;
