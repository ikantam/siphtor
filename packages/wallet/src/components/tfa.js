import React from 'react';
import Speakeasy from 'speakeasy';
import QRCode from 'qrcode';

class Tfa extends React.Component {
    static speakEasyOptions = {
        length: 32,
        name: 'demo wallet',
        issuer: 'siphtor wallet',
        otpauth_url: true
    }

    constructor(props) {
        super(props);
        if (!localStorage.getItem('base32')) {
            this.generateSecret();
            this.generateQRCode();
        }
        this.state = { verifyResult: '' };
    }

    generateSecret() {
        const secret = Speakeasy.generateSecret(Tfa.speakEasyOptions);
        localStorage.setItem('base32', secret.base32);
        localStorage.setItem('otpauth_url', secret.otpauth_url);
        localStorage.setItem('google_auth_qr', secret.google_auth_qr);
    }

    generateTotp() {
        const token = Speakeasy.totp({
            secret: localStorage.getItem('base32'),
            encoding: 'base32'
        });
        return token;
    }

    verifyTotp(token) {
        const result = Speakeasy.totp.verify({
            secret: localStorage.getItem('base32'),
            encoding: 'base32',
            token: token,
            window: 1
        });
        console.log(result);
        return result;
    }

    generateQRCode() {
        QRCode.toDataURL(localStorage.getItem('otpauth_url'), function(err, dataUrl) {
            localStorage.setItem('data_url', dataUrl);
        });
    }

    onVerify = () => {
        const totp = document.getElementById('totp');
        this.setState({verifyResult: this.verifyTotp(totp.value).toString()});
    }

    render() {
        return (
            <div>
                <img src={localStorage.getItem('data_url')} style={{display: 'block'}}/>
                <input id="totp" type="text" style={{margin: 10 + 'px', width: 80 + 'px', height: 21 + 'px'}} />
                <a onClick={this.onVerify}>Verify!</a>
                <p style={{margin: 10 + 'px'}}>{this.state.verifyResult || 'Waiting attempt'}</p>
                <p style={{margin: 10 + 'px'}}>{this.generateTotp()}</p>
            </div>
        );
    }
}

export default Tfa;
