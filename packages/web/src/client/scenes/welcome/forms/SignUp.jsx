import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      confirmation: null,
      login: null,
      disabled: true,
      authenticated: false
    };
  }

  onChangeLogin = (e) => {
    this.setState({ login: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onChangeConfirmation = (e) => {
    this.setState({ confirmation: e.target.value });
  }

  canSingUp = () => {
    const password = this.state.password;
    let result = password && password.length > 0;
    result = password === this.state.confirmation;
    result &= password && password.length > 3;
    return !result;
  }

  onSignUp = async (e) => {
    e.preventDefault();
    const { notify } = this.props;
    axios.post('/api/user', {
      password: this.state.password,
      login: this.state.login
    })
    .then((response) => {
      this.setState({ authenticated: true });
    })
    .catch((error) => {
      console.log(error);
      // notify({
      //   title: 'Error',
      //   message: e.response.data.message,
      //   status: 'error',
      //   dismissible: true,
      //   dismissAfter: 2000
      // });
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to='/signin'/>;
    }

    return (
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input
              onChange={this.onChangeLogin}
              className="form-control form-control-lg"
              type="text"
              placeholder="Login"/>
          </fieldset>

          <fieldset className="form-group">
            <input
              onChange={this.onChangePassword}
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"/>
          </fieldset>

          <fieldset className="form-group">
            <input
              onChange={this.onChangeConfirmation}
              className="form-control form-control-lg"
              type="password"
              placeholder="Retype Password"/>
          </fieldset>

          <Link to="/">
            <button className="btn btn-lg btn-primary pull-left" type="submit">
              <i className="fa fa-arrow-left"/> Back
            </button>
          </Link>
          &nbsp;
          <button
            disabled={this.canSingUp()}
            onClick={this.onSignUp}
            className="btn btn-lg btn-primary pull-right"
            type="submit">
            Sign Up <i className="fa fa-user"/>
          </button>
        </fieldset>
      </form>
    );
  }
}

export default SignUp;
