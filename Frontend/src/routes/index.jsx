import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Trending from "../pages/Trending";
import Bookmark from "../pages/Bookmark";
import MovieDetails from "../pages/MovieDetails";
import TVDetails from "../pages/TVDetails";
import TVShows from "../pages/TvShows";
import Movies from "../pages/Movies";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        // NEW: was missing before, so clicking any TV Show card 404'd
        path: "tv/:id",
        element: <TVDetails />,
      },
      {
        path: "tv",
        element: <TVShows />,
      },
    ],
  },
]);

export default router;
