const movieReducer = (movies = [], action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return [...action.payload];
    case "RESET_MOVIES":
      return [];
    default:
      return movies;
  }
};

export default movieReducer;
