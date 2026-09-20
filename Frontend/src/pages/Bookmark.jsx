import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchBookmarks } from "../../redux/slice/BookmarkSlice";
import { isLoggedIn } from "../utils/auth";

import { FaBookmark, FaFilm, FaTv } from "react-icons/fa";

const Bookmark = () => {
  const dispatch = useDispatch();
  const loggedIn = isLoggedIn();

  const bookmarks = useSelector((state) => state.bookmarks.items);
  const status = useSelector((state) => state.bookmarks.status);

  // Bookmark page उघडताच backend कडून ताजे bookmarks आणतो
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, loggedIn]);

  if (!loggedIn) {
    return (
      <div className="ml-32 min-h-screen flex flex-col items-center justify-center text-white px-8">
        <FaBookmark className="text-5xl text-gray-600 mb-5" />
        <h2 className="text-2xl mb-3">Please login to see your bookmarks</h2>
        <Link
          to="/login"
          className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-2xl font-semibold transition"
        >
          Login
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="ml-32 min-h-screen flex items-center justify-center text-white text-2xl">
        Loading your bookmarks...
      </div>
    );
  }

  const bookmarkedMovies = bookmarks.filter((item) => item.type !== "TV Show");
  const bookmarkedTVShows = bookmarks.filter((item) => item.type === "TV Show");

  return (
    <div className="ml-32 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-8 py-6">
      <SearchBar placeholder="Search your bookmarks" />

      {/* Movies Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-500/20 p-3 rounded-2xl">
            <FaFilm className="text-red-500 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl">Bookmarked Movies</h2>
            <p className="text-gray-400">{bookmarkedMovies.length} saved movies</p>
          </div>
        </div>

        {bookmarkedMovies.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <FaBookmark className="text-5xl text-gray-600 mx-auto mb-5" />
            <h3 className="text-2xl mb-3">No Bookmarked Movies</h3>
            <p className="text-gray-400">Movies you save will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {bookmarkedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* TV Shows Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-500/20 p-3 rounded-2xl">
            <FaTv className="text-blue-400 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl">Bookmarked TV Shows</h2>
            <p className="text-gray-400">{bookmarkedTVShows.length} saved shows</p>
          </div>
        </div>

        {bookmarkedTVShows.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <FaTv className="text-5xl text-gray-600 mx-auto mb-5" />
            <h3 className="text-2xl mb-3">No Bookmarked TV Shows</h3>
            <p className="text-gray-400">TV shows you save will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {bookmarkedTVShows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
