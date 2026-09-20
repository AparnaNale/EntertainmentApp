const mongoose = require("mongoose");

// एक bookmark document = एका user ने save केलेला एक movie/TV show
const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: Number, // TMDB चा movie/tv id
      required: true,
    },
    type: {
      type: String,
      enum: ["Movie", "TV Show"],
      required: true,
    },
    title: String,
    posterPath: String,
    backdropPath: String,
    releaseDate: String,
    voteAverage: Number,
  },
  { timestamps: true }
);

// एकाच user ने एकच movie दोनदा bookmark करू नये यासाठी compound unique index
bookmarkSchema.index({ user: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
