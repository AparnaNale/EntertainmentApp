// backend शी बोलणारा एकच केंद्रीय helper.
// प्रत्येक page मध्ये वेगवेगळं fetch() + header लिहिण्याऐवजी हे एकच function वापरा.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // controller ने पाठवलेला error message वर काढतो (उदा. "Invalid email or password")
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
