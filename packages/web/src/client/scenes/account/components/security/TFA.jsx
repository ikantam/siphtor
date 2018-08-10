import React from 'react';
import Navigation from 'Scenes/account/components/security/Navigation';

class Security extends React.Component {
  render() {
    return (
<div>
  <div className="table-wrapper">
      <Navigation/>
      <div className="right-content qr two-element">
          <div className="right-align">
              <div className="qr-code">
                  <div className="text">
                      <span>QR Code For Authenticator</span>
                  </div>
                  <div className="code">
                    <img src="/public/images/left-page/qrcode.svg" width="100px" alt=""/>
                  </div>
              </div>
              <div className="secret-key">
                  <span>Secret Key: PM3TQNZMNBUWCQDXJQSTIM2IF54SKIKVN4USK4TLPBXW4N23KVAQ</span>
              </div>
              <div className="qr-input">
                  <input type="password"
                         className="form-control"
                         placeholder="Input 6-digit authenticator code"/>
                  <button className="btn">Enable</button>
              </div>

          </div>
      </div>
  </div>
  <div className="bottom-line right" style={{display: "none"}}>
      <a src="#">Siphtor Wallet Terms & Conditions</a>
      <b>|</b>
      <a src="#">About</a>
      <b>|</b>
      <a src="#">Privacy Policy</a>
      <b>|</b>
      <a src="#">Get in Touch</a>
  </div>
</div>
    );
  }
}

export default Security;
