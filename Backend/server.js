const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" })); 
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookmarks", require("./routes/bookmarkRoutes"));

app.get("/", (req, res) => {
  res.send("Entertainment App API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
