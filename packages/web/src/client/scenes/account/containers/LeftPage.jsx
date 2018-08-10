import React from 'react';
import { NavLink } from 'react-router-dom';
import SecureLS from 'secure-ls';

class LeftPage extends React.Component {

  render() {
    window.ls = new SecureLS();
    let subwallet = ls.get('subwallet');
    let sph = ls.get('user').sph;
    let usd = ls.get('user').usd;
    let sph_usd = sph * 2;
    let login = ls.get('user').credentials.login;

    if (ls.get('subwallet')) {
      sph = subwallet.sph;
      usd = subwallet.usd;
      sph_usd = sph * 2;
      login = subwallet.walletId
    }

    const totalUsd = sph_usd + usd;

    return (
<div id="left-page">
    <div className="qrcode-siphtor-logo">
        <div className="qrbar">
          <img src="/public/images/left-page/qrcode.svg" width="85px" alt=""/>
            <div>Wallet ID</div>
        </div>
        <div className="siphtor-wallet-logo">
          <img src="/public/images/left-page/siphtor-wallet-logo.svg" width="90px" alt=""/>
        </div>
    </div>
    <hr className="green-line"/>
    <div className="userinfo">
      <div className="user-fullname">
        { `${ls.get('user').info.firstName} ${ls.get('user').info.lastName}` }
        </div>
        <div className="user-login">
            LOGIN: { login }
        </div>
        <div className="user-member-since">
            SIPHTOR MEMBER SINCE: July 2018
        </div>
    </div>
    <div className="table-wrapper">
        <div className="account-balance">
            <div>
              Account<br/>
                Balance:
            </div>
            <div className="money-account">
              { totalUsd } USD
            </div>
        </div>


        <div className="wallets for-mobile" style={{display: "none"}}>
            Wallets
            <a className="toggler" data-toggle="collapse" href="#navbarSupportedContent"
               data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
               aria-expanded="false" aria-label="Toggle navigation"><i
                    className="fa fa-align-justify"></i></a>
            <div className="collapse" id="navbarSupportedContent">
                <div className="sph-wallet" style={{marginTop: "10px"}}>
                  <span className="wallet-name-with-icon">
                    <img src="/public/images/left-page/dollar-orange.svg" width="30px" alt=""/> SPH Wallet</span>
                    <span className="money-wallet">
                    <span>{ sph } SPH</span>
                    <div className="money-wallet-grey">{ sph_usd } USD</div>
                  </span>
                </div>
                <hr className="green-thin-line"/>
                <div className="sph-wallet">
                  <span className="wallet-name-with-icon">
                    <img src="/public/images/left-page/dollar-orange.svg" width="30px" alt=""/> ETH Wallet</span>
                    <span className="money-wallet">
                    <span>0 ETH</span>
                    <div className="money-wallet-grey">0 USD</div>
                  </span>
                </div>
                <hr className="green-thin-line"/>
                <div className="sph-wallet">
                  <span className="wallet-name-with-icon">
                    <img style={{marginRight: '26px', marginLeft: '19px'}} src="/public/images/left-page/dollar-symbol-orange.svg" width="12px"
                      alt=""/> USD Wallet</span>
                    <span className="money-wallet">
                    <span>{ usd } USD</span>
                  </span>
                </div>
            </div>
        </div>


        <div className="not-mobile">
          <hr className="green-thin-line"/>
            <div className="sph-wallet">
            <span className="wallet-name-with-icon">
              <img src="/public/images/left-page/dollar-orange.svg" width="30px" alt=""/> SPH Wallet</span>
                <span className="money-wallet">
              <span>{ sph } SPH</span>
              <div className="money-wallet-grey">{ sph_usd } USD</div>
            </span>
            </div>

            <hr className="green-thin-line"/>

            <div className="sph-wallet">
            <span className="wallet-name-with-icon">
              <img src="/public/images/left-page/dollar-orange.svg" width="30px" alt=""/> ETH Wallet</span>
                <span className="money-wallet">
              <span>0 ETH</span>
              <div className="money-wallet-grey">0 USD</div>
            </span>
            </div>

            <hr className="green-thin-line"/>

            <div className="sph-wallet">
            <span className="wallet-name-with-icon">
              <img style={{marginRight: "26px", marginLeft: "19px"}} src="/public/images/left-page/dollar-symbol-orange.svg" width="12px" alt=""/> USD Wallet</span>
                <span className="money-wallet">
              <span>{ usd } USD</span>
            </span>
            </div>
            <hr className="green-thin-line"/>
            <div className="wallets-security">
              <hr className="green-line"/>
              <img src="/public/images/left-page/dollar.svg" width="25px" alt=""/>
              &nbsp;
              <NavLink to="/account/subwallets">
                <span>Sub-wallets</span>
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <img src="/public/images/left-page/security.svg" width="25px" alt=""/>
              &nbsp;
              <NavLink to="/account/security/password">
                <span>Security</span>
              </NavLink>
            </div>
        </div>
    </div>
    <div style={{textAlign: "center"}} className="bottom-line">
        <a src="#">Siphtor Wallet Terms & Conditions</a>
        <span style={{color: "black"}}>|</span>
        <a src="#">About</a>
        <span style={{color: "black"}}>|</span>
        <a src="#">Privacy Policy</a>
        <span style={{color: "black"}}>|</span>
        <a src="#">Get in Touch</a>
    </div>
</div>
    );
  }
}

export default LeftPage;
