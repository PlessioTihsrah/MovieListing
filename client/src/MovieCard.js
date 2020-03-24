import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavourite, removeFavourite } from "./store/actions/userActions";

const MovieCard = ({
  token,
  movie,
  favourite,
  addFavourite,
  removeFavourite
}) => {
  const { Poster, Title, Year, Type, imdbID } = movie;
  return (
    <div className="col-12 col-md-6 col-lg-3 my-2">
      <div className="card">
        <img
          style={{ minHeight: "340px" }}
          src={Poster}
          alt={Title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>

          <h6 className="card-subtitle mb-2 text-muted">
            {Year}, {Type + " "}
            {favourite && (
              <i
                className="fas fa-heart text-danger"
                onClick={() => removeFavourite(imdbID, token)}
              ></i>
            )}
            {!favourite && (
              <i
                className="far fa-heart text-danger"
                onClick={() => addFavourite(imdbID, Poster, token)}
              ></i>
            )}
          </h6>
          <Link to={`/movie/${imdbID}`} className="card-link">
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addFavourite, removeFavourite })(MovieCard);
