import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';
import SecureLS from 'secure-ls';
import SendForm from 'Scenes/account/forms/SendForm';

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      symbol: 'sph',
      disabled: false,
      login: '',
    }
  }

  onChangeSymbol = (e) => {
    this.setState({
      symbol: e.target.value,
    });
  }

  onChangeLogin = (e) => {
    this.setState({
      login: e.target.value,
    });
  }

  onChangeAmount = (e) => {
    let disabled = false;
    let v = e.target.value;
    if (v <= 0 || ls.get('user')[this.state.symbol] < v) {
      disabled = true;
    }
    this.setState({
      amount: e.target.value,
      disabled: disabled
    });
  }

  onSend = (e) => {
    e.preventDefault();
    const {notify} = this.props;
    window.ls = new SecureLS();
    axios.post('/api/send', {
      symbol: this.state.symbol,
      amount: this.state.amount,
      login: this.state.login
    })
    .then(response => {
        // notify({ message: `Transfer was successful`, status: 'success' });
        this.forceUpdate();
      }
    )
    .catch(e => {
      // notify({
      //   message: e.response.data.message,
      //   status: 'error'
      // });
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <div className="right-transactions">
          <a className="" href="#">
            <img src="/public/images/left-page/arrow-left.svg" width="44px"/>
          </a>
          <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
          <span className="right-transactions-text">SEND</span>
        </div>
        <SendForm />
      </div>
    );
  }
}

export default connect(null, {notify})(Send);
