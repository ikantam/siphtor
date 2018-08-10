import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import SecureLS from 'secure-ls';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '1111',
      login: '1111',
      authenticated: false
    };
  }

  onChangeLogin = (e) => {
    this.setState({ login: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSignIn = async (e) => {
    e.preventDefault();
    const {notify} = this.props;
    axios.post('/api/session', {
      password: this.state.password,
      login: this.state.login
    })
    .then((response) => {
      notify({
        title: 'Success',
        status: 'success',
        message: 'Sign in was successful'
      });
      axios.get('/api/session')
      .then((response) => {
        window.ls = new SecureLS();
        ls.set('user', response.data.user);
        this.setState({ authenticated: true});
      })
    })
    .catch((error) => {
      console.dir(error);
      notify({
        title: 'Error',
        message: error.response.data.message,
        position: 'tr',
        status: 'error'
      });
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to='/account'/>;
    }

    return (
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input onChange={this.onChangeLogin}
              className="form-control form-control-lg"
              type="text"
              placeholder="Login"/>
          </fieldset>

          <fieldset className="form-group">
            <input onChange={this.onChangePassword}
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"/>
          </fieldset>

          <Link to="/">
            <button className="btn btn-lg btn-primary pull-left" type="submit">
              <i className="fa fa-arrow-left"/> Back
            </button>
          </Link>
          &nbsp;
          <button onClick={this.onSignIn} className="btn btn-lg btn-primary pull-right" type="submit">
            Sign in <i className="fa fa-sign-in-alt"/>
          </button>
        </fieldset>
      </form>
    );
  }
}

export default connect(null, {notify})(SignIn);
