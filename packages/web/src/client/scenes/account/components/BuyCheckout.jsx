import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import SecureLS from 'secure-ls';

import {connect} from 'react-redux';
import {notify} from 'reapop';

const STRIPE_PUBLISHABLE = 'pk_test_hBJzeEREF20aFwKEoSLfCAPm'
const PAYMENT_SERVER_URL = '/api/stripe/charge'

const CURRENCY = 'USD';

const fromEuroToCent = amount => amount * 100;

const errorPayment = data => {
  alert('Payment Error');
};

class Checkout extends React.Component {
  static defaultProps = {
    disabled: true,
    amount: 0,
    name: ''
  }

  constructor(props) {
    super(props);
  }

  onToken = (amount) => token => {
    const {notify} = this.props;
    window.ls = new SecureLS();
    axios.post(PAYMENT_SERVER_URL,
      {
        stripeToken: token.id,
        symbol: this.props.symbol,
        amount: amount,
        userId: ls.get('user').userId
      })
      .then(response => {
          this.forceUpdate();
        }
      )
  }

  render() {
    return (
      <StripeCheckout
        name={this.props.name}
        amount={fromEuroToCent(this.props.amount)}
        token={this.onToken(this.props.amount)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      >
        <button style={{marginTop: "0"}} className="btn" disabled={this.props.disabled}>Buy with payment card</button>
      </StripeCheckout>)
  }
}

export default connect(null, {notify})(Checkout);
