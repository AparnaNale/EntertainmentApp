// login/signup नंतर token + user माहिती localStorage मध्ये कशी ठेवायची/वाचायची/काढायची -
// हे सगळं एकाच जागी, जेणेकरून Navbar/Login/Signup/pages सगळीकडे सुसंगत राहील.

export const saveAuth = ({ token, ...user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const isLoggedIn = () => Boolean(getToken());

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
