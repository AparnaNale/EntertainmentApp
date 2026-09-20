import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaPlay,
  FaBookmark,
  FaRegBookmark,
  FaFire,
} from "react-icons/fa";

import { toggleBookmark } from "../../redux/slice/BookmarkSlice";
import { isLoggedIn } from "../utils/auth";

const apiKey = import.meta.env.VITE_API_KEY;

// NEW FILE: this page did not exist before, so every TV Show card
// either 404'd or (via MovieCard's old hardcoded link) tried to load
// as a movie and failed. This mirrors MovieDetails but hits the /tv
// TMDB endpoints and TV-shaped fields (name, first_air_date, seasons).
const TVDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  const bookmarks = useSelector((state) => state.bookmarks.items);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setShow({
          ...data,
          title: data.name,
          release_date: data.first_air_date,
          type: "TV Show",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrailer();
  }, [id]);

  const toggle = () => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    dispatch(toggleBookmark(show));
  };

  if (!show) {
    return (
      <div className="ml-32 min-h-screen bg-black text-white flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  const isBookmarked = bookmarks.some((item) => item.id === show.id);
  const runtime = show.episode_run_time?.[0];

  return (
    <div className="ml-32 min-h-screen bg-black text-white">
      <div className="relative h-[500px] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
      </div>

      <div className="relative z-10 px-8 lg:px-16 -mt-64 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[28%]">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.title}
              className="w-full rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="lg:w-[72%] flex flex-col justify-end">
            <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-400 w-fit px-4 py-2 rounded-full mb-5">
              <FaFire />
              <span className="text-sm font-medium">Trending Now</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
              {show.title}
            </h1>

            <div className="flex items-center gap-5 mb-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= Math.round(show.vote_average / 2)
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </div>

              <span className="text-2xl font-bold">
                {show.vote_average?.toFixed(1)}
              </span>

              <span className="text-gray-400">({show.vote_count} votes)</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                <FaCalendarAlt className="text-blue-400" />
                <span>{show.release_date}</span>
              </div>

              {runtime && (
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                  <FaClock className="text-blue-400" />
                  <span>{runtime} min / ep</span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                <span>{show.number_of_seasons} Season(s)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
              {show.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 hover:bg-blue-500 transition px-4 py-2 rounded-full text-sm cursor-pointer"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-9 text-lg max-w-4xl">
                {show.overview}
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => {
                  if (trailerKey) {
                    window.open(
                      `https://www.youtube.com/watch?v=${trailerKey}`,
                      "_blank"
                    );
                  }
                }}
                className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-2xl font-bold text-lg transition duration-300 hover:scale-105"
              >
                <FaPlay />
                Watch Trailer
              </button>

              <button
                onClick={toggle}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl font-bold text-lg transition duration-300 hover:scale-105"
              >
                {isBookmarked ? (
                  <FaBookmark className="text-blue-400" />
                ) : (
                  <FaRegBookmark />
                )}
                {isBookmarked ? "Saved" : "Add Watchlist"}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-400 mb-2">Status</p>
                <h3 className="font-bold text-lg">{show.status}</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-400 mb-2">Language</p>
                <h3 className="font-bold text-lg uppercase">
                  {show.original_language}
                </h3>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-400 mb-2">Popularity</p>
                <h3 className="font-bold text-lg">
                  {show.popularity?.toFixed(0)}
                </h3>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
                <p className="text-gray-400 mb-2">Episodes</p>
                <h3 className="font-bold text-lg">{show.number_of_episodes}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetails;
