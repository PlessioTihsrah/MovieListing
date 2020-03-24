import React from "react";
import { connect } from "react-redux";
import { checkAuth, logout } from "./store/actions/userActions";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login";
import MovieSearch from "./MovieSearch";
import MovieInfo from "./MovieInfo";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import Favourites from "./Favourites";

function App({ user, checkAuth, logout }) {
  if (user.id === null) {
    checkAuth();
    return <div />;
  } else if (!user.id) {
    return <Login />;
  } else {
    return (
      <BrowserRouter>
        <Header logout={logout} />
        <Switch>
          <Route path="/" exact component={MovieSearch} />
          <Route path="/favourites" exact component={Favourites} />
          <Route path="/movie/:id" exact component={MovieInfo} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, { checkAuth, logout })(App);
