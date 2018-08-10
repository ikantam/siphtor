import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {notify} from 'reapop';
import { Redirect } from 'react-router'
// import db from '../services/db';

class SignUp extends React.Component {
    static propTypes = {
        password: PropTypes.string,
        confirmation: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmation: null,
            email: null,
            disabled: true,
            registered: false
        };
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeConfirmation = (e) => {
        this.setState({ confirmation: e.target.value });
    }

    componentDidUpdate = () => {
        this.canSingUp();
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
      const {notify} = this.props;
      try {
        let response = await axios.post('/api/signup', {
          password: this.state.password,
          email: this.state.email
        });
        ls.set('data', response.data.data);
        ls.set('auth?', true);
        this.forceUpdate();
      } catch(e) {
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
          return <Redirect to='/wallets'/>;
        }
        return (
        <div className="app_pageWrapper_2GcaG">
    <div className="container">
        <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
                <div className="set-password_container_dncOt">
                    <h3>Create Wallet</h3>
                    <p>Enter your login and password with confirmation</p>
                    <div className="set-password_wrapperPassword_3o7iH">
                        <input onChange={this.onChangeEmail} type="email" className="set-password_input_3WKDc input_input_32E4i" placeholder="Login" autoComplete="off"/>
                    </div>
                    <div className="set-password_wrapperPassword_3o7iH">
                        <input onChange={this.onChangePassword} type="password" className="set-password_input_3WKDc input_input_32E4i" placeholder="Password" autoComplete="off"/>
                    </div>
                    <div className="set-password_wrapInput_3Gn31">
                        <div className="set-password_secureNoteWrapper_1HThP">
                            <div className="tooltip_wrapper_2pDFm">
                                <div className="secure-note_secureNote_2SEKG"><img src="/public/images/16djMkL.svg?1522250547189" alt="Secure encryption"/><span>Secure encryption</span></div>
                            </div>
                        </div>
                        <input onChange={this.onChangeConfirmation} type="password" className="set-password_input_3WKDc input_input_32E4i" placeholder="Password Confirmation" autoComplete="off"/>
                    </div>
                    <div className="set-password_buttonsWrapper_1d0qf">
                        <Link to="/">
                        <button className="back-button_backButton_2i8tV button_button_3sUWn button_simple_3l8_S"><img className="back-button_iconBack_ryDWT" alt="" src="/public/images/32-BNn3.svg?1522250547189"/><span>Back</span></button></Link>
                        <Link to="/wallets" onClick={this.onSignUp}>
                            <button disabled={this.canSingUp()} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs">Create</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
    }
}

export default connect(null, {notify})(SignUp);
