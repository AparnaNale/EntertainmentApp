import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar";
import Recommended from "./Recommended";
import { toggleBookmark } from "../../redux/slice/BookmarkSlice";
import { isLoggedIn } from "../utils/auth";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.items);

  // Fetch Trending Movies & TV Shows
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(data.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const toDetailItem = (movie) => ({
    ...movie,
    title: movie.title || movie.name,
    release_date: movie.release_date || movie.first_air_date,
    type: movie.media_type === "tv" ? "TV Show" : "Movie",
  });

  // Bookmark Toggle
  const handleBookmark = (movie) => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    dispatch(toggleBookmark(toDetailItem(movie)));
  };

  return (
    <div className="lg:ml-32 min-h-screen text-white px-4 sm:px-6 lg:px-8 py-6 overflow-hidden pb-24">
      <SearchBar placeholder="Search for movies or TV shows" />

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl tracking-wide">Trending</h1>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={true}
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        >
          {trendingMovies.map((movie) => {
            const isBookmarked = bookmarks.some((item) => item.id === movie.id);

            return (
              <SwiperSlide key={movie.id}>
                <div
                  onClick={() =>
                    navigate(
                      movie.media_type === "tv"
                        ? `/tv/${movie.id}`
                        : `/movie/${movie.id}`
                    )
                  }
                  className="relative h-[220px] sm:h-[260px] rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : "https://via.placeholder.com/500x300?text=No+Image"
                    }
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleBookmark(movie);
                    }}
                    className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition"
                  >
                    {isBookmarked ? (
                      <FaBookmark className="text-white text-lg" />
                    ) : (
                      <FaRegBookmark className="text-white text-lg" />
                    )}
                  </button>

                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      {movie.media_type === "tv" ? "TV Show" : "Movie"}
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-1">
                      {movie.title || movie.name}
                    </h2>

                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300">
                      <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                      <span>
                        {(movie.release_date || movie.first_air_date)?.split("-")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <section>
        <h1 className="text-2xl sm:text-3xl mb-8 tracking-wide">
          Recommended for you
        </h1>
        <Recommended />
      </section>
    </div>
  );
};

export default Home;
