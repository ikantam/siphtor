import React from 'react';
import SecureLS from 'secure-ls';

class Receive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { symbol: 'sph' }
  }

  onChangeCurrency = (e) => {
    this.setState({symbol: e.target.value});
  }

  render() {
    window.ls = new SecureLS();
    let subwallet = ls.get('subwallet');
    let sph = ls.get('user').sph;
    let usd = ls.get('user').usd;
    let sph_usd = sph * 2;

    if (ls.get('subwallet')) {
      sph = subwallet.sph;
      usd = subwallet.usd;
      sph_usd = sph * 2;
    }

    return (
      <div className="table-wrapper">
        <div className="right-transactions">
          <a className="" href="#">
            <img src="/public/images/left-page/arrow-down-orange.svg" width="44px"/>
          </a>
          <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
          <span className="right-transactions-text">RECEIVE</span>
        </div>


        <div style={{padding: "10px 25px"}} className="your-wallet">
          Your Wallet
          <p></p>
          <div className="input-group form-group">
            <span className="input-group-addon" title="Amount" id="priceLabel"><img src="/public/images/left-page/dollar-orange.svg" width="30px" alt=""/> Wallet</span>

            <span className="input-group-addon" style={{width: "0px", paddingLeft:"0px", paddingRight: "0px", border: "none"}}></span>

            <select onChange={this.onChangeCurrency} id="searchbygenerals_currency" name="searchbygenerals[currency]" className="form-control">
                <option value="sph">SPH</option>
                <option value="usd">USD</option>
            </select>
          </div>

          <div style={{marginTop: "30px"}} className="qrcode-receive">
            <img src="/public/images/left-page/qrcode.svg" width="100px" alt=""/>
            <span style={{marginLeft: "10px"}}>Wallet Balance: {`${this.state.symbol == 'usd' ? usd : sph} ${this.state.symbol.toUpperCase()}`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Receive;
