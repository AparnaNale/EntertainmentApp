# 🎬 Entertainment App — Full Stack Project

A full-stack movies & TV shows discovery app. Browse trending titles, search, view details, and save personal bookmarks built with a React (Vite) frontend and a Node.js/Express/MongoDB backend, powered by the TMDB API.

```
Entertainment App/
├── Frontend/   → React + Vite + Redux Toolkit + Tailwind (client)
└── Backend/    → Node.js + Express + MongoDB (REST API)
```

---

## ✨ Features

- Browse **Trending**, **Movies**, and **TV Shows** (via TMDB API)
- **Search** across movies and TV shows
- **Movie / TV detail pages** with full info
- **User authentication** — signup & login (JWT-based)
- **Bookmarks** — save/remove titles per logged-in user, persisted in MongoDB
- Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

| Layer     | Technology                                                        |
|-----------|---------------------------------------------------------------------|
| Frontend  | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, Swiper   |
| Backend   | Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs                |
| External  | [TMDB API](https://www.themoviedb.org/documentation/api) for movie/TV data |

---

## 📁 Project Structure

```
Backend/
├── config/db.js               MongoDB connection
├── controllers/                signup/login, bookmark logic
├── middleware/                 JWT auth guard, error handler
├── models/                     User, Bookmark (Mongoose schemas)
├── routes/                     /api/auth, /api/bookmarks
├── server.js                   app entry point
└── .env.example

Frontend/
├── src/
│   ├── components/             Navbar, MovieCard, SearchBar
│   ├── pages/                  Home, Movies, TvShows, Trending, Search,
│   │                           MovieDetails, TVDetails, Bookmark, Login, SignUp
│   ├── routes/index.jsx        React Router route map
│   ├── utils/                  api.js (fetch helper), auth.js (token/session)
│   └── App.jsx / main.jsx
├── redux/slice/BookmarkSlice.jsx   Bookmark state (async thunks → backend)
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Backend setup

```bash
cd Backend
npm install
cp .env.example .env
```

Fill in `Backend/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/entertainment-app
JWT_SECRET=your_own_long_random_secret
PORT=5000
```

```bash
npm run dev
```
API runs at `http://localhost:5000`.

### 2. Frontend setup

```bash
cd Frontend
npm install
cp .env.example .env
```

Fill in `Frontend/.env`:
```
VITE_API_KEY=your_tmdb_api_key_here
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```
App runs at `http://localhost:5173` (default Vite port).

> Run both servers (Backend on 5000, Frontend on 5173) at the same time for the app to work end-to-end.

---

## 🔌 API Overview (Backend)

| Method | Endpoint                    | Auth | Description                       |
|--------|------------------------------|------|------------------------------------|
| POST   | `/api/auth/signup`          | ❌   | Create a new account               |
| POST   | `/api/auth/login`           | ❌   | Log in, returns JWT                |
| GET    | `/api/auth/me`              | 🔒   | Get logged-in user's profile       |
| GET    | `/api/bookmarks`             | 🔒   | Get all bookmarks for the user     |
| POST   | `/api/bookmarks`             | 🔒   | Toggle a bookmark (add/remove)     |
| DELETE | `/api/bookmarks/:movieId`    | 🔒   | Remove a bookmark by TMDB id       |

🔒 Protected routes require `Authorization: Bearer <token>`.

Full request/response examples and the database schema are documented in **`Backend/README.md`**.

---

## 🗄 Data Model

```
User (1) ───< (many) Bookmark
```
- **User**: name, email (unique), bcrypt-hashed password, optional profile image
- **Bookmark**: linked to a user, TMDB `movieId`, type (Movie/TV Show), title, poster, backdrop, release date, rating — unique per `(user, movieId)` pair

---

## ✅ Best Practices Implemented

- Passwords hashed with bcrypt; JWT-based stateless auth
- Centralised error-handling middleware (no repeated try/catch)
- MVC-style backend folder separation (routes/controllers/models/middleware)
- Environment variables for all secrets (`.env`, never committed)
- Centralised frontend API helper (`utils/api.js`) instead of scattered `fetch` calls
- Redux Toolkit slice with async thunks for bookmark state, kept in sync with the backend
- CORS enabled for cross-origin frontend ↔ backend requests

---

## 📄 More Details

- Backend-specific docs (full API request/response bodies, error shapes): `Backend/README.md`
- Frontend-specific docs (build/lint scripts): `Frontend/README.md`