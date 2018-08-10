import React from 'react';
import axios from 'axios';
import Navigation from 'Scenes/account/components/security/Navigation';
import PasswordChangeForm from 'Scenes/account/forms/PasswordChangeForm';

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: null,
      password: null,
      passowrdConfirmation: null,
    };
  }

  componentDidUpdate = () => {
    this.canSingUp();
  }

  onChangeOldPassword = (e) => {
    this.setState({ oldPassword: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ newPassword: e.target.value });
  }

  onChangeConfirmation = (e) => {
    this.setState({ confirmation: e.target.value });
  }

  onUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/password', this.state);
    } catch (e) {
      console.dir(e);
    }
  }

  canChange = () => {
    const password = this.state.newPassword;
    let result = password && password.length > 0;
    result = password === this.state.confirmation;
    result &= password && password.length > 3;
    return !result;
  }

  render() {
    return (
      <div>
        <div className="table-wrapper">
          <Navigation />
          <div className="right-content pass two-element">
            <div className="right-align">
              <h4>
                Change Password
              </h4>
              <span>
                Password encrypts your private keys. Do not forget to save the password.
                The password can not be recovered if you lost it.
              </span>
              <PasswordChangeForm />
            </div>
          </div>
        </div>
        <div className="bottom-line right" style={{ display: 'none' }}>
          <a href="##">
            Siphtor Wallet Terms & Conditions
          </a>
          <b>
            |
          </b>
          <a href="##">
            About
          </a>
          <b>
            |
          </b>
          <a href="##">
            Privacy Policy
          </a>
          <b>
            |
          </b>
          <a href="##">
            Get in Touch
          </a>
        </div>
      </div>
    );
  }
}

export default Password;
