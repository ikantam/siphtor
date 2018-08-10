import React from 'react';
import { Link } from 'react-router-dom';

export default function ExchangeStep2() {
  return (
    <div >
      <div className="send-confirm_rightIconSection_eeX4V app_rightIconSection_1PVQz"><img src="/public/images/1oMS8Hu.svg?1522250547189" alt="" />
        <p>Please check details and confirm.</p>
      </div>
      <div className="send-confirm_wrapperForm_139Ip app_wrapperLeftBlock_382sa">
        <div className="send-confirm_headerTitles_1HMQg">
          <h3>Are you sure you want to</h3>
          <h2>Exchange {localStorage.getItem('amountE')} SPH?</h2>
        </div>
        <div className="send-confirm_label_2OtVN"><span>You will exchange</span>
          <div>{ localStorage.getItem('amountE') } SPH</div>
        </div>
        <div className="send-confirm_label_2OtVN"><span>You will receive</span>
          <div>{ parseInt(localStorage.getItem('amountE'), 10) * 0.4 } USD</div>
        </div>
        <div className="send-confirm_label_2OtVN"><span>Fee</span>
          <div><a href="#">Excluded</a>0.000063 SPH</div>
        </div>
        <div className="send-confirm_separator_ufMnf" />
        <div className="send-confirm_footerBlock_EX2S_">
          <div className="send-confirm_stepInfo_fP7jS">Step 2 of 3</div>
          <Link to="/wallets/exchange/step3">
            <button className="button_button_3sUWn button_blue_2oFPD button_big_2vavs">Confirm</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
