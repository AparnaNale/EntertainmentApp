import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { apiFetch } from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(""); // base64 preview, optional
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Profile image is optional, per spec
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  // हे frontend-side validation आहे - झटपट feedback साठी.
  // पण असली duplicate-email / final सत्यता तपासणी आता backend करतो.
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      // UPDATED: आता actual backend ला call जातो (आधी फक्त localStorage मध्ये सेव्ह व्हायचं)
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileImage,
        }),
      });

      // FIX: आता signup नंतर auto-login होत नाही -> Login page वर पाठवतो,
      // user स्वतः email/password टाकून login करेल
      // FIX: alert() ऐवजी आता थेट + smoothly Login page उघडतं,
      // email आधीच भरलेला असतो आणि तिथे हिरवा success मेसेज दिसतो
      navigate("/login", {
        state: { signupSuccess: true, email: formData.email },
      });
    } catch (error) {
      // उदा. "An account with this email already exists" (backend कडून)
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSignup}
        noValidate
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>

        {errors.form && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>
        )}

        {/* Optional Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-gray-500" />
            )}
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="text-sm text-gray-400 mt-2">
            Add profile photo (optional)
          </span>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 mt-5 outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 mt-5 outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 mt-5 mb-6 outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm -mt-5 mb-6">
            {errors.confirmPassword}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 py-4 rounded-2xl font-semibold transition"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have account?{" "}
          <Link to="/login" className="text-red-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;