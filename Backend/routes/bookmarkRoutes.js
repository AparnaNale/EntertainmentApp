const express = require("express");
const {
  getBookmarks,
  toggleBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// सगळे bookmark routes protected आहेत - आधी login/token लागतो
router.use(protect);

router.get("/", getBookmarks);
router.post("/", toggleBookmark);
router.delete("/:movieId", removeBookmark);

module.exports = router;
