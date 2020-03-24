import React from "react";
import { Link } from "react-router-dom";

const Header = ({ logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="navbar-nav ml-auto">
        <Link className="nav-item nav-link" to="/favourites">
          Favourites
        </Link>

        <Link
          className=" btn-link nav-item nav-link"
          to="#"
          onClick={() => logout()}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};
export default Header;
