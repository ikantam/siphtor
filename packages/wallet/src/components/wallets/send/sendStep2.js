import React from 'react';
import { Link } from 'react-router-dom';
import crypto from 'crypto';
import { connect } from 'react-redux';
import { notify } from 'reapop';

class SendStep2 extends React.Component {
    _onClick = () => {
      const {notify} = this.props;
      let hash = '0x' + crypto.randomBytes(20).toString('hex')
      let currency = ls.get('currency').toLowerCase();
      let value = parseFloat(ls.get('amount'));
      let to = ls.get('toEmail');
      let from = ls.get('data').email;
      let date = Date.now();

      ls.set('hash', hash);

      axios.post('/api/transfer', {
        hash: hash,
        currency: currency,
        value: value,
        to: to,
        from: from,
        date: date
      }).then((response) => {
        ls.set('data', response.data.data)
      });
    }

    render() {
      return (
    <div>
        <div className="send-confirm_rightIconSection_eeX4V app_rightIconSection_1PVQz"><img src="/public/images/1oMS8Hu.svg?1522250547189" alt=""/>
            <p>Please check details and confirm.</p>
        </div>
        <div className="send-confirm_wrapperForm_139Ip app_wrapperLeftBlock_382sa">
            <div className="send-confirm_headerTitles_1HMQg">
                <h3>Are you sure you want to</h3>
                <h2>Send {ls.get('amount')} { ls.get('currency') }?</h2></div>
            <div className="send-confirm_label_2OtVN"><span>You will send</span>
                <div>{ ls.get('amount') } { ls.get('currency') }</div>
            </div>
            <div className="send-confirm_label_2OtVN"><span>To login</span>
                <div>{ ls.get('toEmail') }</div>
            </div>
            <div className="send-confirm_separator_ufMnf"></div>
            <div className="send-confirm_footerBlock_EX2S_">
                <div className="send-confirm_stepInfo_fP7jS">Step 2 of 3</div>
                <Link to="/wallets/send/step3">
                  <button onClick={this._onClick} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs">Confirm</button>
                </Link>
            </div>
        </div>
    </div>
    );
  }
}

export default connect(null, {notify})(SendStep2);
