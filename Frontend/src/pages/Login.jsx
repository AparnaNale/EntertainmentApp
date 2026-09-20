import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { apiFetch } from "../utils/api";
import { saveAuth } from "../utils/auth";
import { fetchBookmarks } from "../../redux/slice/BookmarkSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // NEW: SignUp page इथून navigate करताना state मध्ये email + success flag पाठवतो
  const signupSuccess = location.state?.signupSuccess;

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      saveAuth(data);
      dispatch(fetchBookmarks()); // login होताच त्या user चे जुने bookmarks आणतो
      navigate("/");
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        noValidate
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>

        {/* NEW: SignUp वरून आल्यावर हिरवा success banner */}
        {signupSuccess && (
          <p className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/30 rounded-xl py-3 mb-4">
            Account created! Please login below.
          </p>
        )}

        {errors.form && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 mt-5 mb-6 outline-none"
          autoFocus={signupSuccess} // email आधीच भरलेला असल्याने cursor थेट password वर
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-5 mb-6">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 py-4 rounded-2xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don't have account?{" "}
          <Link to="/signup" className="text-red-400">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;