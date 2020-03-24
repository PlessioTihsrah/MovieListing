import React from "react";
import movieAPI from "./api/movieApi";
import { connect } from "react-redux";
import { addFavourite, removeFavourite } from "./store/actions/userActions";

class MovieInfo extends React.Component {
  state = {
    movie: null
  };
  componentDidMount() {
    movieAPI
      .get("", {
        params: {
          i: this.props.match.params.id,
          plot: "full"
        }
      })
      .then(({ data }) => {
        if (data.Error) {
          this.props.history.replace("/");
        } else {
          this.setState({ movie: data });
        }
      });
  }
  render() {
    const { movie } = this.state;
    if (!movie) {
      return <div />;
    } else {
      const { addFavourite, removeFavourite, token, favourites } = this.props;
      return (
        <div className="container my-5">
          <div className="card p-2">
            <div className="row">
              <div className="col-12 col-md-4">
                <img width="100%" src={movie.Poster} alt={movie.Title} />
                <p className="text-center">
                  <b>imdb Rating:</b>
                  {movie.imdbRating}

                  <b> Votes:</b>
                  {movie.imdbVotes}
                </p>
                {movie.Ratings.map(rating => {
                  return (
                    <div className="text-center" key={rating.Source}>
                      <b>{rating.Source}:</b> {rating.Value}
                    </div>
                  );
                })}
              </div>
              <div className="col-12 col-md-8">
                <h3>{movie.Title}</h3>
                <div>
                  <span className="h6">{movie.Released} </span>
                  {movie.imdbID in favourites && (
                    <i
                      className="fas fa-heart text-danger"
                      onClick={() => removeFavourite(movie.imdbID, token)}
                    ></i>
                  )}
                  {!(movie.imdbID in favourites) && (
                    <i
                      className="far fa-heart text-danger"
                      onClick={() =>
                        addFavourite(movie.imdbID, movie.Poster, token)
                      }
                    ></i>
                  )}
                </div>
                <hr />
                <p>{movie.Plot}</p>
                <dl>
                  <dt>Actors:</dt>
                  <dd>{movie.Actors}</dd>
                  <dt>Writer: </dt>
                  <dd>{movie.Writer}</dd>
                  <dt>Director: </dt>
                  <dd>{movie.Director}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  console.log(state.user);
  return {
    token: state.user.token,
    favourites: state.user.favourites
  };
};
export default connect(mapStateToProps, { addFavourite, removeFavourite })(
  MovieInfo
);
