const Bookmark = require("../models/Bookmark");

// @route   GET /api/bookmarks
// @access  Private
// लॉगिन केलेल्या user चे सगळे bookmarks परत करतो
const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/bookmarks
// @access  Private
// आधीच bookmark असेल तर काढून टाकतो (toggle), नसेल तर नवीन बनवतो
const toggleBookmark = async (req, res, next) => {
  try {
    const { movieId, type, title, posterPath, backdropPath, releaseDate, voteAverage } =
      req.body;

    if (!movieId || !type) {
      res.status(400);
      throw new Error("movieId and type are required");
    }

    const existing = await Bookmark.findOne({
      user: req.user._id,
      movieId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ bookmarked: false, movieId });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      movieId,
      type,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      voteAverage,
    });

    res.status(201).json({ bookmarked: true, bookmark });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/bookmarks/:movieId
// @access  Private
const removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user._id,
      movieId: req.params.movieId,
    });

    if (!bookmark) {
      res.status(404);
      throw new Error("Bookmark not found");
    }

    res.json({ message: "Bookmark removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBookmarks, toggleBookmark, removeBookmark };
