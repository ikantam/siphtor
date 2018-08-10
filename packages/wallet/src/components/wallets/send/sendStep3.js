import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { notify } from 'reapop';

class SendStep3 extends React.Component {
  render() {
    return (
      <div className="send-status_wrapperCenter_Rb7G9"><img src="/public/images/UZtbRND.svg?1522250547189" alt="" />
        <h3 className="send-status_successTitle_2wylN">Transaction successfully sent!</h3>
        <div className="send-status_hash_1MWDD">Hash:&nbsp;{ ls.get('hash') }</div>
      </div>
    );
  }
}
export default SendStep3;
