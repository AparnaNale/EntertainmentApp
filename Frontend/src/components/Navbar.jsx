import {
  FaFire,
  FaFilm,
  FaTv,
  FaBookmark,
} from "react-icons/fa";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";

import userIcon from "../assets/usericon.jpg";
import { getUser, isLoggedIn, logout } from "../utils/auth";
import { clearBookmarks } from "../../redux/slice/BookmarkSlice";

const Navbar = () => {

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const dispatch = useDispatch();

  const loggedIn = isLoggedIn();
  const user = getUser(); 

  const navigation = [
    {
      label: <FaFire />,
      href: "/trending",
    },
    {
      label: <FaFilm />,
      href: "/movies",
    },
    {
      label: <FaTv />,
      href: "/tv",
    },
    {
      label: <FaBookmark />,
      href: "/bookmark",
    },
  ];

  
  const handleLogout = () => {

    logout(); 
    dispatch(clearBookmarks()); 

    window.location.href = "/";

  };

  return (

    <>
    
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 px-4 py-4">

        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          <div className="flex items-center justify-between">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl">

                🎬

              </div>

              <h1 className="text-white text-xl font-bold">
                Entertainment
              </h1>

            </Link>

            <ul className="flex items-center gap-3">

              {navigation.map((nav, index) => (

                <li key={index}>

                  <NavLink
                    to={nav.href}
                    className={({ isActive }) =>
                      `flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300
                      
                      ${
                        isActive
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-gray-400"
                      }`
                    }
                  >

                    {nav.label}

                  </NavLink>

                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

      <div className="hidden lg:flex fixed left-5 top-5 h-[94vh] w-28 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex-col items-center py-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50">

        <Link
          to="/"
          className="mb-12 group"
        >

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-4xl shadow-[0_10px_30px_rgba(239,68,68,0.5)] group-hover:scale-110 transition duration-300">

            🎬

          </div>

        </Link>

        <ul className="flex flex-col gap-7">

          {navigation.map((nav, index) => (

            <li key={index}>

              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `flex items-center justify-center w-16 h-16 rounded-3xl text-2xl transition-all duration-300
                  
                  ${
                    isActive
                      ? "bg-gradient-to-br from-red-500 to-red-700 text-white scale-110 shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105"
                  }`
                }
              >

                {nav.label}

              </NavLink>

            </li>

          ))}

        </ul>

        <div
          className="mt-auto relative"
          onMouseEnter={() =>
            setShowProfileMenu(true)
          }
          onMouseLeave={() =>
            setShowProfileMenu(false)
          }
        >

          <img
            src={user?.profileImage || userIcon}
            alt="user"
            className="w-16 h-16 rounded-3xl border-2 border-red-500 object-cover cursor-pointer hover:scale-105 transition duration-300"
          />

          <div
            className={`absolute bottom-20 left-1/2 -translate-x-1/2 w-44 bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]
            
            ${
              showProfileMenu
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible translate-y-4"
            }`}
          >

            {loggedIn ? (

              <div className="flex flex-col gap-1">

                {user?.name && (
                  <p className="text-white text-sm text-center mb-2 truncate">
                    {user.name}
                  </p>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition font-medium"
                >

                  Logout

                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-3">

                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-2xl transition"
                >

                  Login

                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white text-center py-3 rounded-2xl transition"
                >

                  Sign Up

                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </>

  );
};

export default Navbar;