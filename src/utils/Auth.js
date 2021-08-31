export const setAuthToken = (token) => {
  return localStorage.setItem("token", token);
};
export const firstTimeLoggin = (x) => {
  let value;
  if (x == 1) {
    value = true;
  } else {
    value = false;
  }
  return localStorage.setItem("firstTimeLogin", value);
};
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const loginStatus = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};


export const removeAuthToken = () => {
  localStorage.removeItem("token");
};
export const removeLoginStatus = () => {
  localStorage.removeItem("firstTimeLogin");
};

export const logoutFunction = () => {
  removeAuthToken();
  window.location = "/login";
};
