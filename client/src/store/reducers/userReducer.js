const authReducer = (auth = { id: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...action.payload };
    case "LOGOUT":
      localStorage.removeItem("auth");
      return { id: false };
    case "ADD_FAVOURITES":
      const new_auth = { ...auth, favourites: action.payload };
      localStorage.setItem("auth", JSON.stringify(new_auth));
      return new_auth;

    default:
      return auth;
  }
};

export default authReducer;
