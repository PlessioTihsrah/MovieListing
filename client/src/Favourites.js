import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Favourites = ({ favourites }) => {
  const favouriteCards = [];
  for (let f in favourites) {
    favouriteCards.push(
      <div key={f} className="col-4 col-md-2 my-1">
        <div className="card">
          <img src={favourites[f]} className="card-img-top" alt="" />
          <Link className="text-center" to={`/movie/${f}`}>
            View Info
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">{favouriteCards}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return { favourites: state.user.favourites };
};
export default connect(mapStateToProps)(Favourites);
