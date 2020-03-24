import React from "react";
import MovieCard from "./MovieCard";
import { getMovie, resetMovies } from "./store/actions/movieActions";
import { connect } from "react-redux";
class MovieSearch extends React.Component {
  state = {
    timer: 2400,
    text: "",
    interval: null
  };
  resetTimer = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ timer: 2400, interval: null });
    }
  };
  search = () => {
    this.props.getMovie(this.state.text);
    this.resetTimer();
  };
  startTimer = e => {
    if (!e.target.value) {
      this.resetTimer();
    } else {
      if (this.state.interval) {
        this.resetTimer();
      }
      const interval = setInterval(() => {
        this.setState({ timer: this.state.timer - 400 });
      }, 400);

      this.setState({ interval, text: e.target.value });
    }
  };
  componentWillUnmount() {
    this.props.resetMovies();
  }
  render() {
    const { movies, favourites, token } = this.props;
    const movieCards = movies.map(movie => {
      return (
        <MovieCard
          movie={movie}
          key={movie.imdbID}
          favourite={movie.imdbID in favourites}
          token={token}
        />
      );
    });
    const { timer } = this.state;
    if (timer <= 0) {
      this.search();
    }
    return (
      <div className="container my-3">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie title to search"
            onChange={this.startTimer}
          />
          <div className="progress" style={{ height: "2px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(timer - 400) / 20}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </form>
        <div className="row">{movieCards}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movies,
    favourites: state.user.favourites,
    token: state.user.token
  };
};
export default connect(mapStateToProps, { getMovie, resetMovies })(MovieSearch);
