import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBookmark,
  FaFilm,
  FaRegBookmark,
  FaTv,
} from "react-icons/fa";
import { toggleBookmark } from "../../redux/slice/BookmarkSlice";
import { isLoggedIn } from "../utils/auth";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookmarks = useSelector((state) => state.bookmarks.items);
  const isBookmarked = bookmarks.some((item) => item.id === movie.id);

  // FIX: TV shows now link to /tv/:id instead of always /movie/:id
  const detailPath =
    movie.type === "TV Show" ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    dispatch(toggleBookmark(movie));
  };

  return (
    <Link to={detailPath} className="group cursor-pointer">
      {/* Poster */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "https://via.placeholder.com/500x300?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-black/80 transition z-20"
        >
          {isBookmarked ? (
            <FaBookmark className="text-white text-lg" />
          ) : (
            <FaRegBookmark className="text-white text-lg" />
          )}
        </button>
      </div>

      {/* Movie Info */}
      <div className="mt-4">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
          <span>{movie.release_date?.split("-")[0] || "N/A"}</span>

          <span>•</span>

          <span className="flex items-center gap-1">
            {movie.type === "TV Show" ? <FaTv /> : <FaFilm />}
            {movie.type || "Movie"}
          </span>

          <span>•</span>

          <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>

        <h2 className="text-xl font-semibold text-white line-clamp-1">
          {movie.title}
        </h2>
      </div>
    </Link>
  );
};

export default MovieCard;
