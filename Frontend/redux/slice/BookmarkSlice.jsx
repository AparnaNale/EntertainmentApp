import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../src/utils/api";

// Backend "Bookmark" document -> frontend "movie card" shape बनवतो,
// जेणेकरून MovieCard/MovieDetails/Bookmark page मध्ये कुठलाही बदल लागत नाही
// (ते अजूनही movie.id, movie.poster_path, इ. वापरतात)
const toCardShape = (b) => ({
  id: b.movieId,
  title: b.title,
  poster_path: b.posterPath,
  backdrop_path: b.backdropPath,
  release_date: b.releaseDate,
  vote_average: b.voteAverage,
  type: b.type,
});

// GET /api/bookmarks — login नंतर किंवा Bookmark page उघडल्यावर call होतो
export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/bookmarks");
      return data.map(toCardShape);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/bookmarks — bookmark बटण क्लिक केल्यावर (add किंवा remove, दोन्ही एकाच API ने)
export const toggleBookmark = createAsyncThunk(
  "bookmarks/toggleBookmark",
  async (movie, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/bookmarks", {
        method: "POST",
        body: JSON.stringify({
          movieId: movie.id,
          type: movie.type || "Movie",
          title: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        }),
      });

      return { ...data, movie };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // logout झाल्यावर UI लगेच रिकामं दाखवण्यासाठी (सर्व्हरला call नाही)
    clearBookmarks: (state) => {
      state.items = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const { bookmarked, movie } = action.payload;

        if (bookmarked) {
          state.items.push(movie);
        } else {
          state.items = state.items.filter((item) => item.id !== movie.id);
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
