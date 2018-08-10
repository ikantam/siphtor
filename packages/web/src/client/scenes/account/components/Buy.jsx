import React from 'react';
import SecureLS from 'secure-ls';
import BuyForm from 'Scenes/account/forms/BuyForm';

class Buy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      symbol: 'sph'
    }
  }

  componentDidMount() {
    window.ls = new SecureLS();
  }

  onChangeCurrency = (e) => {
    this.setState({symbol: e.target.value});
  }

  onChangeAmount = (e) => {
    let disabled;
    if (e.target.value > 0) {
      disabled = false;
    }
    this.setState({
      amount: e.target.value,
      disabled: disabled
    });
  }

  render() {
    return (
<div>
  <div className="table-wrapper">
    <div className="right-transactions buy">
      <img src="/public/images/left-page/logo.svg" width="44px"/>
      <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
      <span className="right-transactions-text">BUY</span>
    </div>

    <div className="right-content buy">
      <BuyForm />
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

export default Buy;
