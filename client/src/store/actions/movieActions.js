import movieApi from "../../api/movieApi";
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
export const getMovie = keyword => async dispatch => {
  movieApi
    .get("", {
      params: {
        s: keyword,
        type: "movie"
      }
    })
    .then(({ data }) => {
      if (data.Response === "False") {
        throw new Error(data.Error || "Something went Wrong");
      } else {
        dispatch({
          type: "GET_MOVIES",
          payload: [...data.Search]
        });
      }
    })
    .catch(err => {
      store.addNotification({
        ...notficationTemplate,
        title: "Error",
        message: err.message || "Something went wrong",
        type: "danger"
      });
    });
};

export const resetMovies = () => {
  return { type: "RESET_MOVIES" };
};
