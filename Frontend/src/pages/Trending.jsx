import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import Recommended from "./Recommended";
import SearchBar from "../components/SearchBar";

const apiKey = import.meta.env.VITE_API_KEY;

const Trending = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.results || []).map((item) => ({
          ...item,
          title: item.title || item.name,
          release_date: item.release_date || item.first_air_date,
          type: item.media_type === "tv" ? "TV Show" : "Movie",
        }));
        setMovies(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="lg:ml-32 min-h-screen text-white px-4 sm:px-6 lg:px-8 pt-28 lg:pt-8 pb-8">
      <SearchBar placeholder="Search for movies or tv shows" />

      <h1 className="text-2xl sm:text-3xl mb-6 sm:mb-8 tracking-wide">Trending</h1>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-14">
        <h1 className="text-2xl mb-6">Recommended for you</h1>
        <Recommended />
      </div>
    </div>
  );
};

export default Trending;
