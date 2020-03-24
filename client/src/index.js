import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <Provider store={store}>
    <div className="app-container">
      <ReactNotification />
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
