import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';
import { Redirect } from 'react-router'
import Speakeasy from 'speakeasy';

class SignIn2fa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    verifyTotp(token) {
        const result = Speakeasy.totp.verify({
            secret: ls.get('data').base32,
            encoding: 'base32',
            token: token,
            window: 1
        });
        return result;
    }
    onChangeToken = (e) => {
        this.setState({ token: e.target.value });
    }

    onSignIn = async (e) => {
      e.preventDefault();
      const totp = document.getElementById('totp');
      const {notify} = this.props;
      if (this.verifyTotp(totp.value)) {
        ls.set('2fa?', true);
        this.forceUpdate();
      } else {
        notify({
          message: 'Wrong token',
          status: 'error',
          dismissible: true,
          dismissAfter: 2000
        });
      }
    }

    render() {
        if (ls.get('2fa?')) {
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
                          <p>You have Two-Factor authentication enabled
                          <br/>Please Enter Your Google Authenticator Six-Digit Code</p>
                          <input id="totp" onChange={this.onChangeEmail} value={this.state.pass} type="email" className="enter-password_input_Nr7ci input_input_32E4i" placeholder="Input 6-digit authenticator code" autoComplete="off"/>
                          <div style={{float: 'right'}} className="enter-password_buttonsWrapper_aKbSb">
                              <button onClick={this.onSignIn} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs ">Continue</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
       );
    }
}

export default connect(null, {notify})(SignIn2fa);
