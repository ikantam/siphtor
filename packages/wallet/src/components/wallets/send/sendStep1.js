import React from 'react';
import { Link } from 'react-router-dom';
import WalletsDropdown from '../../common/walletsDropdown';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'
import {notify} from 'reapop';

class SendStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          amount: 0,
          index: 0,
          toEmail: '',
          checkedEmail: null,
          checkedAmount: null
        };
    }

    onChangeAmount = (e) => {
        this.setState({ amount: e.target.value });
        ls.set('amount', e.target.value);
        ls.set('checkedAmount', false)
    }

    onChangeEmail = (e) => {
        this.setState({ toEmail: e.target.value });
        ls.set('toEmail', e.target.value);
        ls.set('checkedEmail', false)
    }

    componentWillUnmount() {
      ls.set('checkedEmail', 'unmount')
      ls.set('checkedAmount', false)
      ls.set('clicked', false);
      console.log('dfdf')
    }

    componentWillMount() {
      ls.set('currency', 'SPH')
      ls.set('checkedEmail', null)
    }

    _onClick = (e) => {
      ls.set('clicked', true);
      e.preventDefault();
      const {notify} = this.props;
      axios.post('/api/exist', {email: this.state.toEmail}).then((response) => {
          if (response.data.exist == 'false') {
            notify({
              title: 'Error',
              message: `Entered login doesn't exist`,
              status: 'error',
              dismissible: true,
              dismissAfter: 2500
            });
          } else {
            if (ls.get('checkedEmail') != 'unmount' )
              ls.set('checkedEmail', true)
          }
          this.forceUpdate();
      });
      let have;
      if (this.state.index == 0) {
         have = parseFloat(ls.get('data')['balance:sph']);
      } else {
         have = parseFloat(ls.get('data')['balance:usd']);
      }
      let amount = parseFloat(this.state.amount);
      if (amount <= have && amount > 0) {
        ls.set('checkedAmount', true)
      } else {
        notify({
          title: 'Error',
          message: `Incorrect amount`,
          status: 'error',
          dismissible: true,
          dismissAfter: 2500
        });
      }
      this.forceUpdate();
    }

    _onChange = (i) => {
      this.state.index = i;
      ls.set('currency', i == 0 ? 'SPH' : 'USD' )
    }

    render() {
        if (ls.get('checkedAmount') && ls.get('clicked')
            && ls.get('checkedEmail') && ls.get('checkedEmail') != 'unmount') {
          return <Redirect to="/wallets/send/step2"/>
        }
        return (
    <div >
        <div className="send_rightIconSection_1j-TD app_rightIconSection_1PVQz"><img src="/public/images/140mAbg.svg?1522250547189" alt=""/>
            <p>Instantly send your coins or tokens.</p>
        </div>
        <div className="send_wrapperForm_1KXoL app_wrapperLeftBlock_382sa">
            <div className="send_labelForm_2K0H6 app_labelForm_19xr3">From</div>
            <WalletsDropdown onChangeRef={this._onChange}/>
            <div className="send_labelForm_2K0H6 app_labelForm_19xr3">To</div>
            <div className="relative">
                <div className="input-address_wrapper_3hYJj">
                    <input onChange={this.onChangeEmail} type="text" className="send_inputAddress_2IMzv app_input_37biS input-address_input_uYEUi input_input_32E4i" placeholder="Enter login of siphtor user" />
                </div>
            </div>
            <div className="send_labelForm_2K0H6 app_labelForm_19xr3">Amount</div>
            <div className="send_wrapperInput_2aHe8">
                <div className="input-amount_wrapper_2dduI">
                    <input onChange={this.onChangeAmount} type="number" step="1e-18" min="0" max="0.001" className="send_inputAmount_2dsXD app_input_37biS input-amount_input_1WAAp input_input_32E4i" placeholder="0" required="" value={this.state.amount}/>
                    <div className="input-amount_fiatAmount_1qgfu"></div>
                </div>
            </div>
            <div className="send_footerBlock_3cccA app_footerBlock_1E4DW">
                <div className="send_stepInfo_2Np3y app_stepInfo_8AxXd">Step 1 of 3</div>
                  <button onClick={this._onClick} className="button_button_3sUWn button_blue_2oFPD button_big_2vavs" disabled="">Next</button>
            </div>
        </div>
    </div>
        );
    }
}

export default connect(null, {notify})(SendStep1);
