import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: null,
            newPassword: null,
            confirmation: null,
            updated: false,
            disabled: true
        };
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

    componentDidUpdate = () => {
        this.canSingUp();
    }

    canSingUp = () => {
        const password = this.state.newPassword;
        let result = password && password.length > 0;
        result = password === this.state.confirmation;
        result &= password && password.length > 3;
        return !result;
    }

    onUpdate = async (e) => {
      e.preventDefault();
      const {notify} = this.props;
      try {
        let response = await axios.put('/api/password', {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        });
        console.dir(response)
        notify({
          title: 'Password changed',
          message: response.data.message,
          status: 'success',
          dismissible: true,
          dismissAfter: 2000
        });
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
        return (
            <div className="change-password_wrapperForm_19RPC app_wrapperCenterBlock_21Sbx">
            <h4>Change password</h4>
            <p>Password encrypts your private keys. Do not forget to save the password. The password can not be recovered if you lose it.</p>
            <input onChange={this.onChangeOldPassword} type="password" className="change-password_input_1dYcg app_input_37biS input_input_32E4i"  autoComplete="off" placeholder="Old password"/>
            <input onChange={this.onChangePassword} type="password" className="change-password_input_1dYcg app_input_37biS input_input_32E4i"  placeholder="New password" autoComplete="off"/>
            <input onChange={this.onChangeConfirmation} type="password" className="change-password_input_1dYcg app_input_37biS input_input_32E4i"  autoComplete="off" placeholder="Repeat new password"/>
            <div className="change-password_footerButtonStatus_1C284 app_footerButtonStatus_28fXU">
                <div></div>
                <button disabled={this.canSingUp()} onClick={this.onUpdate} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs" >Change password</button>
            </div>
            <div className="clearfix"></div>
        </div>
        );
    }
}

export default connect(null, {notify})(Password);
