import React from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Speakeasy from 'speakeasy';

const styleInput = {
  padding: '12px 19px',
  marginTop: '13px',

}

class TFA extends React.Component {
    verifyTotp(token) {
        const result = Speakeasy.totp.verify({
            secret: ls.get('data').base32,
            encoding: 'base32',
            token: token,
            window: 1
        });
        return result;
    }

    onVerify = () => {
        const totp = document.getElementById('totp');
        const {notify} = this.props;
        if (this.verifyTotp(totp.value)) {
          notify({
            message: 'Two-Factor Authentication successfully enabled',
            status: 'success',
            dismissible: true,
            dismissAfter: 2000
          });
          axios.post('/api/2fa', { twa: 'true' }).then((response) => {
            ls.set('data', response.data.data);
            this.forceUpdate();
          });
        } else {
          notify({
            message: 'Wrong token',
            status: 'error',
            dismissible: true,
            dismissAfter: 2000
          });
        }
    }

    onDisable = () => {
        const {notify} = this.props;
        const totp = document.getElementById('totp');
        if (this.verifyTotp(totp.value)) {
          notify({
            message: 'Two-Factor Authentication successfully disabled',
            status: 'success',
            dismissible: true,
            dismissAfter: 2000
          });
          axios.post('/api/2fa', { twa: 'false' }).then((response) => {
            ls.set('data', response.data.data);
            this.forceUpdate();
          });
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
        let twa;
        if (ls.get('data')['2fa'] == 'false') {
          twa = (<button onClick={this.onVerify} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs ">Enable</button> )
          } else {
            twa = (<button onClick={this.onDisable} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs ">Disable</button>
              )
          }
        return (
            <div>
                <div className="main_wrapperWallets_UaBHp">
                    <h4>QR Code For Authenticator</h4>
                </div>
                <div className="main_wrapperBlocks_Vgf_d">
                    <img style={{height: '154px', width: '154px important!'}} src={ls.get('data').data_url}/>
                    <div className="main_wallerWrapper_KxoGB">
                        <div className="main_walletInfo_1sBOC">
                            <div style={{fontSize: 13 + 'px'}} className="main_contentBlock_AJyFJ">Secret key: {ls.get('data').base32}</div>
                            <input style={styleInput} type="password" className="change-password_input_1dYcg app_input_37biS input_input_32E4i" id="totp" autoComplete="off" placeholder="Input 6-digit authenticator code"/>
                            <div className="enter-password_buttonsWrapper_aKbSb" style={{float: 'right'}}>
                            {twa}                            </div>
                      </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(null, {notify})(TFA);
