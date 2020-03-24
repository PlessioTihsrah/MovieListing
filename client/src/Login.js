import React from "react";
import { connect } from "react-redux";
import { login, signup } from "./store/actions/userActions";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password, type } = this.state;
    if (type === "Login") {
      this.props.login(email, password);
    } else {
      this.props.signup(email, password);
    }
  };
  render() {
    const { email, password } = this.state;
    const disable = !email || !password;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="mt-5">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="col">
              <button
                disabled={disable}
                type="submit"
                className="btn btn-success btn-block"
                onClick={() => this.setState({ type: "Login" })}
              >
                Login
              </button>
            </div>
            <div className="col">
              <button
                type="submit"
                disabled={disable}
                className="btn btn-primary btn-block"
                onClick={() => this.setState({ type: "Signup" })}
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { login, signup })(Login);
