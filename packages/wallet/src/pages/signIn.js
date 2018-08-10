import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';
import { Redirect } from 'react-router'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            email: null,
            signedIn: false
        };
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onSignIn = async (e) => {
      e.preventDefault();
      const {notify} = this.props;
      try {
        let response = await axios.post('/api/auth', {
          password: this.state.password,
          email: this.state.email
        });
        ls.set('data', response.data.data);
        ls.set('auth?', true);
        this.forceUpdate();
      } catch(e) {
        console.dir(e)
        notify({
          title: 'Error',
          message: e.response.data.message,
          status: 'error',
          dismissible: true,
          dismissAfter: 2000
        });
      };
    }

    render() {
        if (ls.get('auth?')) {
          if (ls.get('data')['2fa'] == 'true') {
            return <Redirect to='/signin/2fa'/>;
          }
          return <Redirect to='/wallets'/>;
        }
        const sec = (
          <div className="tooltip_wrapper_2pDFm">
              <div className="secure-note_secureNote_2SEKG"><img src="/public/images/16djMkL.svg?1522250547189" alt="Secure encryption"/><span>Secure encryption</span></div>
          </div>
        );
        const inv = (
          <div className="enter-password_errorMasterPassword_1Zy-j">Password is invalid</div>
        );
        return (
        <div className="app_pageWrapper_2GcaG" style={{minHeight: 'calc(100vh - 120px)'}}>
          <div className="container">
              <div className="row">
                  <div className="col-xs-6 col-xs-offset-3">
                      <div className="enter-password_container_3ZIwl">
                          <h3>Sign In</h3>
                          <p>Enter the login and the password to sign in to the wallet</p>
                          <input onChange={this.onChangeEmail} value={this.state.pass} type="email" className="enter-password_input_Nr7ci input_input_32E4i" placeholder="Login" autoComplete="off"/>
                          <input onChange={this.onChangePassword} value={this.state.pass} type="password" className="enter-password_input_Nr7ci input_input_32E4i" placeholder="Password" autoComplete="off"/>
                          <div style={{float: 'right'}} className="enter-password_buttonsWrapper_aKbSb">
                              <button onClick={this.onSignIn} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs ">Sign In</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
       );
    }
}

export default connect(null, {notify})(SignIn);
