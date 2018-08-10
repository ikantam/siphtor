import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

import {connect} from 'react-redux';
import {notify} from 'reapop';

const STRIPE_PUBLISHABLE = 'pk_test_hBJzeEREF20aFwKEoSLfCAPm'
const PAYMENT_SERVER_URL = '/stripe/charge'

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
    axios.post(PAYMENT_SERVER_URL,
      {
        stripeToken: token.id,
        currency: CURRENCY,
        amount: amount,
        to: ls.get('data').email
      })
      .then(response => {
          notify({
            message: `Purchase was successful`,
            status: 'success',
            dismissible: true,
            dismissAfter: 2500
          });
          ls.set('data', response.data.data)
        }
      );
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
        <button className="button_button_3sUWn button_blue_2oFPD " disabled={this.props.disabled}>Buy with payment card</button>
      </StripeCheckout>)
  }
}

export default connect(null, {notify})(Checkout);
