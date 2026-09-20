const mongoose = require("mongoose");

// एक user document = एक registered account
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // -> signup वेळी duplicate email आपोआप reject होतं
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8, // frontend validation शी match
    },
    // ऐच्छिक profile photo - frontend base64 string पाठवतो
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt / updatedAt आपोआप जोडतं
);

module.exports = mongoose.model("User", userSchema);
