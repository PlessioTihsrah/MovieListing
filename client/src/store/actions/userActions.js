import serverApi from "../../api/server";
import { store } from "react-notifications-component";
const notficationTemplate = {
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 2000,
    onScreen: true
  }
};

export const login = (email, password) => async dispatch => {
  serverApi
    .post("/login", JSON.stringify({ email, password }))
    .then(({ data }) => {
      dispatch({
        type: "LOGIN",
        payload: {
          token: data.token,
          id: data.email,
          favourites: data.favourites
        }
      });
    })
    .catch(err => {
      store.addNotification({
        ...notficationTemplate,
        title: "Error",
        message: err.response
          ? err.response.data.message
          : "Something went wrong",
        type: "danger"
      });
    });
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const checkAuth = () => {
  const auth = JSON.parse(localStorage.getItem("auth")) || false;
  if (auth) {
    getFavourite(auth.token);
    return {
      type: "LOGIN",
      payload: { ...auth }
    };
  } else {
    return { type: "LOGOUT" };
  }
};

export const signup = (email, password) => async dispatch => {
  serverApi
    .post("/signup", JSON.stringify({ email, password }))
    .then(({ data }) => {
      dispatch({
        type: "LOGIN",
        payload: {
          token: data.token,
          id: data.email,
          favourites: data.favourites
        }
      });
    })
    .catch(err => {
      store.addNotification({
        ...notficationTemplate,
        title: "Error",
        message: err.response
          ? err.response.data.message
          : "Something went wrong",
        type: "danger"
      });
    });
};
export const removeFavourite = (movieId, token) => async dispatch => {
  console.log(movieId);
  serverApi
    .delete("/favourites", {
      headers: { Authorization: `Bearer ${token}` },
      data: { movieId }
    })
    .then(({ data }) => {
      dispatch({
        type: "ADD_FAVOURITES",
        payload: data.favourites
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const addFavourite = (movieId, moviePoster, token) => async dispatch => {
  console.log(token);
  serverApi
    .post("/favourites", JSON.stringify({ movieId, moviePoster }), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: "ADD_FAVOURITES",
        payload: data.favourites
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFavourite = token => async dispatch => {
  serverApi
    .get("/favourites", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch({
        type: "ADD_FAVOURITES",
        payload: data.favourites
      });
    })
    .catch(err => {
      console.log(err);
    });
};
