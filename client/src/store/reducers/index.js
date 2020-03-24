import moviesReducer from "./moviesReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

export default combineReducers({
  movies: moviesReducer,
  user: userReducer
});
